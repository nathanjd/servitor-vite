import { memoize } from 'lodash-es';
import { parseCountFromName } from '../parse/parse-count-from-name';
import { removeCountFromName } from '../parse/remove-count-from-name';

interface PointsByModelCount {
    [key: string]: number;
}

interface UnitPoints {
    [key: string]: PointsByModelCount;
}

interface EnhancementPoints {
    [key: string]: number;
}

interface FactionPoints {
    units       : UnitPoints;
    enhancements: EnhancementPoints;
}

export interface PointsValues {
    [key: string]: FactionPoints;
}

const combineFactionPoints = (
    orderedPointsValues: PointsValues[],
    factionName: string,
): FactionPoints => {
    return orderedPointsValues.reduce<FactionPoints>(
        (combined, pointsValues) => {
            const factionPoints = pointsValues[factionName];
            if (!factionPoints) {
                return combined;
            }

            Object.keys(factionPoints.units).forEach(unitName => {
            // Points from earlier in the orderedPointsValues array take
            // precedence.
                if (!combined.units[unitName]) {
                    combined.units[unitName] = factionPoints.units[unitName];
                }
            });

            Object.keys(factionPoints.enhancements).forEach(unitName => {
            // Points from earlier in the orderedPointsValues array take
            // precedence.
                if (!combined.enhancements[unitName]) {
                    combined.enhancements[unitName] =
                            factionPoints.enhancements[unitName];
                }
            });

            return combined;
        },
        { enhancements: {}, units: {} },
    );
};

const combineFactionKeyForCache = (
    orderedPointsValues: PointsValues[],
    factionName: string,
) => {
    return orderedPointsValues + '_' + factionName;
};
const combineFactionPointsMemoized = memoize(
    combineFactionPoints, combineFactionKeyForCache);

const formatUnitSuggestion = (
    unitName: string,
    modelCount: number,
    combinedFactionPoints: FactionPoints,
) => {
    const pointsByModelCount = combinedFactionPoints.units[unitName];
    const modelCountKey = pointsByModelCount[modelCount.toString()] ?
        modelCount.toString() : Object.keys(pointsByModelCount)[0];

    const points = pointsByModelCount[modelCountKey];

    const countPrefix = parseInt(modelCountKey, 10) > 1 ?
        `${modelCountKey} ` : '';
    const suggestedText = `${countPrefix}${unitName} - ${points}`;
    return suggestedText;
};

// const formatUnitSuggestionMemoized = memoize(formatUnitSuggestion, (
//     unitName: string,
//     modelCount: number,
//     combinedFactionPoints: FactionPoints,
// ) => {
//     return [unitName, modelCount, combinedFactionPoints];
// });

export const suggestUnit = (
    text: string,
    factionName: string,
    orderedPointsValues: PointsValues[],
): string => {
    if (orderedPointsValues.length === 0 ) {
        return '';
    }

    const unitNames = suggestUnits(text, factionName, orderedPointsValues);

    if (!unitNames.length) {
        return '';
    }

    return unitNames[0];
};

export const suggestUnits = (
    text: string,
    factionName: string,
    orderedPointsValues: PointsValues[],
): string[] => {
    if (orderedPointsValues.length === 0 ) {
        return [];
    }

    const combinedFactionPoints =
        combineFactionPointsMemoized(orderedPointsValues, factionName);

    const unitNames = Object.keys(combinedFactionPoints.units)
        .map(name => name);
    const normalizedText = text.toLowerCase();
    const normalizedUnitName = removeCountFromName(normalizedText, false);

    const suggestedUnitNames = unitNames.filter(
        unitName => unitName.toLowerCase().indexOf(normalizedUnitName) !== -1,
    );
    const normalizedModelCount = parseCountFromName(normalizedText);

    return suggestedUnitNames.map(unitName => formatUnitSuggestion(
        unitName, normalizedModelCount, combinedFactionPoints));
};

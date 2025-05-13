import { parseCountFromName } from '../parse/parse-count-from-name';
import { removeCountFromName } from '../parse/remove-count-from-name';

import {
    combineFactionPointsMemoized,
    FactionPoints,
    PointsValues,
} from '../points/points';

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

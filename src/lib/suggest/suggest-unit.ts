import { parseCountFromName } from '../parse/parse-count-from-name';
import { removeCountFromName } from '../parse/remove-count-from-name';

import {
    combineFactionPointsMemoized,
    FactionPoints,
    PointSource,
} from '../points/points';

export const formatUnitSuggestionFromFactionPoints = (
    unitName: string,
    modelCount: number,
    combinedFactionPoints: FactionPoints,
) => {
    const pointsByModelCount = combinedFactionPoints.units[unitName];
    const modelCountKey = pointsByModelCount[modelCount.toString()] ?
        modelCount.toString() : Object.keys(pointsByModelCount)[0];
    const points = pointsByModelCount[modelCountKey];
    const modelCountFromFaction = parseInt(modelCountKey, 10);

    return formatUnitSuggestion(unitName, modelCountFromFaction, points);
};

export const formatUnitSuggestion = (
    unitName: string,
    modelCount: number,
    points: number,
) => {
    const countPrefix = modelCount > 1 ? `${modelCount} ` : '';
    return `${countPrefix}${unitName} - ${points}`;
};

export const suggestUnits = (
    text: string,
    factionName: string,
    orderedPointsValues: PointSource[],
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

    return suggestedUnitNames.map(unitName =>
        formatUnitSuggestionFromFactionPoints(
            unitName, normalizedModelCount, combinedFactionPoints));
};

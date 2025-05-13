import { memoize } from 'lodash-es';

export interface PointsByModelCount {
    [key: string]: number;
}

export interface UnitPoints {
    [key: string]: PointsByModelCount;
}

export interface EnhancementPoints {
    [key: string]: number;
}

export interface FactionPoints {
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

export const combineFactionPointsMemoized = memoize(
    combineFactionPoints, combineFactionKeyForCache);

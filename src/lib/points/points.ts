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

export interface PointsByFaction {
    [key: string]: FactionPoints;
}

export interface PointSource {
    id             : string;
    published      : string;
    pointsByFaction: PointsByFaction;
}

export const getDefaultFactionPoints = (): FactionPoints => {
    return {
        units       : {},
        enhancements: {},
    };
};

// Takes an ordered array of points sorces and a faction name
export const combineFactionPoints = (
    orderedPointSources: PointSource[],
    factionName: string,
): FactionPoints => {
    return orderedPointSources.reduce<FactionPoints>(
        (combined, source) => {
            const factionPoints = source.pointsByFaction[factionName];
            if (!factionPoints) {
                return combined;
            }

            Object.keys(factionPoints.units).forEach(unitName => {
            // Points from earlier in the orderedPointSources array take
            // precedence.
                if (!combined.units[unitName]) {
                    combined.units[unitName] = factionPoints.units[unitName];
                }
            });

            Object.keys(factionPoints.enhancements).forEach(unitName => {
            // Points from earlier in the orderedPointSources array take
            // precedence.
                if (!combined.enhancements[unitName]) {
                    combined.enhancements[unitName] =
                            factionPoints.enhancements[unitName];
                }
            });

            return combined;
        },
        getDefaultFactionPoints(),
    );
};

const combineFactionKeyForCache = (
    orderedPointSources: PointSource[],
    factionName: string,
) => {
    return orderedPointSources + '_' + factionName;
};

export const combineFactionPointsMemoized = memoize(
    combineFactionPoints, combineFactionKeyForCache);

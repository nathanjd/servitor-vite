import { useMemo } from 'react';
import {
    combineFactionPoints, FactionPoints, PointsByFaction, PointSource,
} from '../lib/points/points.ts';

export const useCombinedPointsByFaction = (
    pointSources: PointSource[],
    factionNames: string[],
): { [key: string]: FactionPoints } => {
    return useMemo(
        () => factionNames.reduce<PointsByFaction>(
            (pointsByFaction, factionName) => {
                pointsByFaction[factionName] =
                    combineFactionPoints(pointSources, factionName);
                return pointsByFaction;
            },
            {},
        ),
        [pointSources, factionNames],
    );
};

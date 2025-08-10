import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { PointSource } from '../lib/points/points';
import { formatUnitSuggestion } from '../lib/suggest/suggest-unit';
import { favoriteUnits } from '../config/favorite-units';
import { Plus } from '@phosphor-icons/react';
import { useCombinedPointsByFaction } from '../hooks/use-combined-points-by-faction';

interface Props {
    factionNames       : string[];
    orderedPointSources: PointSource[];
    onAddSuggestion    : (suggestion: string) => void;
}

export const UnitSearchStatic = (props: Props): JSX.Element => {
    const { factionNames, onAddSuggestion, orderedPointSources } = props;
    const [text, setText] = useState('');

    const combinedPointsByFaction =
        useCombinedPointsByFaction(orderedPointSources, factionNames);

    const suggestions = useMemo(() => {
        const unitSuggestions: string[] = [];
        factionNames.forEach(factionName => {
            const unitPoints = combinedPointsByFaction[factionName].units;
            for (const [unitName, pointsByModelCount] of Object.entries(unitPoints)) {
                for (const [modelCount, points] of Object.entries(pointsByModelCount)) {
                    unitSuggestions.push(formatUnitSuggestion(
                        unitName, parseInt(modelCount, 10), points,
                    ));
                }
            }
        });

        // Always include favorite units in searchable datalist.
        unitSuggestions.push(...favoriteUnits);

        return unitSuggestions;
    }, [combinedPointsByFaction, factionNames]);

    const handleAddSuggestion = useCallback(() => {
        onAddSuggestion(text);
    }, [onAddSuggestion, text]);

    const handleTextChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
        },
        [],
    );

    return (
        <div className="unit-search">
            <label htmlFor="unit-search-box" />
            <input
                id="unit-search-box"
                type="search"
                list="search-unit-datalist"
                onChange={handleTextChange}
                value={text}
            />

            <datalist id="search-unit-datalist">
                {suggestions.map(suggestion =>
                    <option key={suggestion} value={suggestion} />,
                )}
            </datalist>

            <button
                aria-label="Add suggested unit"
                title="Add suggested unit"
                className="add-suggestion-button button icon-button"
                onClick={handleAddSuggestion}
            >
                <Plus />
            </button>
        </div>
    );
};

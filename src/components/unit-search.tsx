import {
    ChangeEvent,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { debounce } from 'lodash-es';
import { PointsValues } from '../lib/points/points';
import { suggestUnits } from '../lib/suggest/suggest-unit';
import { favoriteUnits } from '../config/favorite-units';
import { Plus } from '@phosphor-icons/react';

interface Props {
    orderedPointsValues: PointsValues[];
    onAddSuggestion    : (suggestion: string) => void;
}

export const UnitSearch = (props: Props): JSX.Element => {
    const { onAddSuggestion, orderedPointsValues } = props;
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [text, setText] = useState('');

    const handleAddSuggestion = useCallback(() => {
        onAddSuggestion(text);
    }, [onAddSuggestion, text]);

    const handleGenerateSuggestion  = useMemo(() =>
        debounce((text: string) => {
            if (!orderedPointsValues) {
                return;
            }

            const factionName = 'Heretic Astartes';
            const suggestions = suggestUnits(
                text, factionName, orderedPointsValues);

            // Also add Chaos Knights
            const additionalSuggestions = suggestUnits(
                text, 'Chaos Knights', orderedPointsValues);
            suggestions.push(...additionalSuggestions);

            // Always include favorite units in searchable datalist.
            suggestions.push(...favoriteUnits);
            setSuggestions(suggestions);
        }, 300), [orderedPointsValues],
    );

    const handleTextChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const armyText = event.target.value;
            setText(armyText);

            try {
                handleGenerateSuggestion(text);
            } catch (error) {
                console.log('autocomplete error:', error);
            }
        }, [handleGenerateSuggestion, text],
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

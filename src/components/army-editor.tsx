import {
    ChangeEvent,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { debounce } from 'lodash-es';
import { useArmy } from '../hooks/use-army';
import { Army, parseArmyText } from '../lib/parse/parse-army-text';
import {
    PointsValues,

    // suggestUnit
} from '../lib/suggest/suggest-unit';
import { UnitSearch } from './unit-search';

interface Props {
    id                 : string;
    orderedPointsValues: PointsValues[];
}

export const ArmyEditor = (props: Props): JSX.Element => {
    const { id, orderedPointsValues } = props;
    const [savedArmy, saveArmy] = useArmy(id);
    const [name, setName] = useState(savedArmy.name);
    const [points, setPoints] = useState(savedArmy.points);
    const [text, setText] = useState(savedArmy.text);

    // const [suggestion, setSuggestion] = useState('');


    // Make sure we change the textarea value when changing armies.
    const [lastId, setLastId] = useState(id);
    if (id !== lastId) {
        setName(savedArmy.name);
        setPoints(savedArmy.points);
        setText(savedArmy.text);
        setLastId(id);
    }

    // Saving armies is much more expensive than parsing them so use a longer
    // debounce for saving.
    const handleSaveArmy = useMemo(() => debounce((army: Army) => {
        saveArmy(army);
    }, 500), [saveArmy]);

    const handleParseArmyText = useMemo(() =>
        debounce((armyText: string) => {
            try {
                const army = parseArmyText(armyText, id);
                setName(army.name);
                setPoints(army.points);
                setText(army.text);
                handleSaveArmy(army);
            } catch (error) {
                console.error('parse error:', error);
            }
        }, 200), [handleSaveArmy, id],
    );

    const handleAddSuggestion = useCallback((suggestion: string) => {
        const newText = text + '\n' + suggestion;
        setText(newText);
        handleParseArmyText(newText);
    }, [handleParseArmyText, text, setText]);

    // const findCurrentUnitName = (
    //     armyText: string,
    //     selectionStart: number,
    // ): string => {
    //     // Iterate backwards through characters until we find a newline
    //     // character or the beginning of input.
    //     let startIndex = Math.max(selectionStart - 1, 0);
    //     while (startIndex > 0 && armyText[startIndex] !== '\n') {
    //         startIndex--;
    //     }

    //     if (armyText[startIndex] === '\n') {
    //         startIndex++;
    //     }

    //     // Iterate forwards through characters until we find a semicolon,
    //     // hyphen, newline character, open parenthesis or end of input.
    //     let endIndex = selectionStart;
    //     const stopCharacters = [':', '-', '(', '\n'];
    //     while (
    //         endIndex < armyText.length &&
    //         !stopCharacters.includes(armyText[endIndex])
    //     ) {
    //         endIndex--;
    //     }

    //     // Find the unit name
    //     return armyText.slice(startIndex, endIndex);
    // };

    // const handleGenerateSuggestion  = useMemo(() =>
    //     debounce((armyText: string, selectionStart: number) => {
    //         if (!orderedPointsValues) {
    //             return;
    //         }

    //         const text = findCurrentUnitName(armyText, selectionStart);
    //         const factionName = 'Heretic Astartes';
    //         const suggestion = suggestUnit(
    //             text, factionName, orderedPointsValues);
    //         setSuggestion(suggestion);
    //     }, 50), [orderedPointsValues],
    // );

    const handleTextChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            const armyText = event.target.value;
            setText(armyText);
            handleParseArmyText(armyText);

            try {
                // handleGenerateSuggestion(armyText, event.target.selectionStart);
            } catch (error) {
                console.log('autocomplete error:', error);
            }
        }, [
            // handleGenerateSuggestion,
            handleParseArmyText,
        ],
    );

    return (
        <div className='army-editor'>
            <div className="army-card">
                <div className="army-header">
                    <h2 className="army-name">
                        {name}
                    </h2>
                    <p className="army-points">{points} Points</p>
                </div>
                <textarea
                    className="army-input"
                    onChange={handleTextChange}
                    value={text}
                />
                <UnitSearch
                    orderedPointsValues={orderedPointsValues}
                    onAddSuggestion={handleAddSuggestion}
                />
                {/* <div className="army-editor-autocomplete">
                    <span>{suggestion}</span>
                </div> */}
                <div className="army-footer">
                    <span className="army-id">{id}</span>
                </div>
            </div>
        </div>
    );
};

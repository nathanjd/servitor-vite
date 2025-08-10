import {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { debounce } from 'lodash-es';
import { useArmy } from '../hooks/use-army';
import { Army, parseArmyText } from '../lib/parse/parse-army-text';

import { PointSource } from '../lib/points/points';

// import { suggestUnit } from '../lib/suggest/suggest-unit';
// import { FactionSelector } from './faction-selector';
import { UnitSearchStatic } from './unit-search-static';

interface Props {
    id                 : string;
    orderedPointSources: PointSource[];
}

export const ArmyEditor = (props: Props): JSX.Element => {
    const { id, orderedPointSources } = props;
    const [savedArmy, saveArmy] = useArmy(id);
    const [name, setName] = useState(savedArmy.name);
    const [points, setPoints] = useState(savedArmy.points);
    const [text, setText] = useState(savedArmy.text);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [selectionStart, setSelectionStart] = useState(0);
    const [selectionEnd, setSelectionEnd] = useState(0);

    // TODO: Start tracking selection to show contextual information.
    // const handleSelect = () => {
    //     if (textareaRef.current) {
    //         setSelectionStart(textareaRef.current.selectionStart);
    //         setSelectionEnd(textareaRef.current.selectionEnd);
    //     }
    // };

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

    // Focus and update the selection when requested. This won't work in iOS as
    // we need to focus and selection can only be controlled during handling
    // of the touch event.
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
    }, [selectionStart, selectionEnd]);

    const handleAddSuggestion = useCallback((suggestion: string) => {
        const newText = text + '\n' + suggestion;
        setText(newText);
        handleParseArmyText(newText);

        // Select newly added unit in textarea,
        setSelectionStart(text.length);
        setSelectionEnd(newText.length);

        // HACK: For focus to work in iOS, we need to focus while the click
        // event is being processed. This allows us to set the selection later
        // in an effecct.
        // if (textareaRef.current) {
        //     textareaRef.current.focus();
        // }

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
    //         if (!orderedPointSources) {
    //             return;
    //         }

    //         const text = findCurrentUnitName(armyText, selectionStart);
    //         const factionName = 'Heretic Astartes';
    //         const suggestion = suggestUnit(
    //             text, factionName, orderedPointSources);
    //         setSuggestion(suggestion);
    //     }, 50), [orderedPointSources],
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
                    {/* <div className="faction-selector-wrapper">
                        <FactionSelector
                            factions={['CSM', 'Daemons', 'Chaos Knights']}
                        />
                    </div> */}
                    <h2 className="army-name">
                        {name}
                    </h2>
                    <p className="army-points">{points} Points</p>
                </div>
                <textarea
                    className="army-input"
                    onChange={handleTextChange}
                    ref={textareaRef}
                    value={text}
                />
                <UnitSearchStatic
                    factionNames={[
                        'Heretic Astartes',
                        'Chaos Daemons',
                        'Chaos Knights',
                    ]}
                    orderedPointSources={orderedPointSources}
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

import {
    ChangeEvent,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { debounce } from 'lodash-es';
import { useArmy } from '../hooks/use-army';
import { Army, parseArmyText } from '../lib/parse-army-text';

interface Props {
    id          : string;
    onDeleteArmy: (id: string) => void;
}

export const ArmyEditor = (props: Props): JSX.Element => {
    const { id, onDeleteArmy } = props;
    const [savedArmy, saveArmy] = useArmy(id);
    const [name, setName] = useState(savedArmy.name);
    const [points, setPoints] = useState(savedArmy.points);
    const [text, setText] = useState(savedArmy.text);

    // Make sure we change the textarea value when changing armies.
    const [lastId, setLastId] = useState(id);
    if (id !== lastId) {
        setName(savedArmy.name);
        setPoints(savedArmy.points);
        setText(savedArmy.text);
        setLastId(id);
    }

    const handleDeleteArmy = useCallback(() => {
        onDeleteArmy(id);
    }, [id, onDeleteArmy]);

    // Saving armies is much more expensive than parsing them so use a longer
    // debounce for saving.
    const handleSaveArmy = useMemo(() => debounce((army: Army) => {
        saveArmy(army);
    }, 500), [saveArmy]);

    const handleParseArmyText = useMemo(() =>
        debounce((armyText: string) => {
            const army = parseArmyText(armyText, id);
            setName(army.name);
            setPoints(army.points);
            setText(army.text);
            handleSaveArmy(army);
        }, 200), [handleSaveArmy, id],
    );

    const handleTextChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            setText(event.target.value);
            handleParseArmyText(event.target.value);
        }, [handleParseArmyText],
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
                <div className="army-footer">
                    <span className="army-id">{id}</span>
                    <button
                        className="delete-army-button button"
                        onClick={handleDeleteArmy}
                    >
                        Delete Army
                    </button>
                </div>
            </div>
        </div>
    );
};

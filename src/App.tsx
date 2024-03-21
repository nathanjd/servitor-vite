import { ChangeEvent, useCallback, useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { parseArmyText, Army } from './lib/parse-army-text';
// import * as armyService from './lib/army-service';
import {debounce} from 'lodash-es';

function App() {
  // const initalArmyId = localStorage.getItem('armyId') || crypto.randomUUID();
  // const [id, setId] = useState(initalArmyId);
  const [points, setPoints] = useState(0);
  const [name, setName] = useState('');

  const initialArmyText = localStorage.getItem('armyText') || '';

  // Parse the initial army text.
  useEffect(() => {
    handleParseArmyText(initialArmyText);
  }, []);

  // Saving armies is much more expensive than parsing them so use a longer
  // debounce for saving.
  const handleSaveArmy = useCallback(debounce((army: Army) => {
    // armyService.saveArmy(army);
    localStorage.setItem('armyText', army.text);
  }, 500), []);

  const handleParseArmyText = useCallback(debounce((armyText: string) => {
    const army = parseArmyText(armyText);
    setName(army.name);
    setPoints(army.points);
    handleSaveArmy(army);
  }, 200), []);

  const handleTextChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    handleParseArmyText(event.target.value);
  }, []);

  return (
    <>
      <div className="app-header">
        <h1>Servitor</h1>
      </div>

      <div className="app-body">
        <nav className="armies-nav">
          <ol>
            <li>Army 1</li>
            <li>Army 2</li>
          </ol>
        </nav>

        <div className='army-editor'>
          <div className="army-card">
            <div className="army-header">
              <p className="army-name">{name}</p>
              <p className="army-points">{points} Points</p>
            </div>
            <textarea
              className="army-input"
              defaultValue={initialArmyText}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

import { useCallback } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { armyService as defaultArmyService } from './lib/army-service';
import { useArmyService } from './hooks/use-army-service';
import { useEditingArmyId } from './hooks/use-editing-army-id';
import { ArmyEditor } from './components/army-editor';
import { ArmyServiceContext } from './contexts/army-service-context';
import { ArmiesNav } from './components/armies-nav';
import { parseArmyText } from './lib/parse-army-text';

function App(): JSX.Element {
    const armyService = useArmyService(defaultArmyService);
    const {
        armyStore,
        resetArmyStoreToDefault,
        saveArmy,
    } = armyService;
    const [editingArmyId, setEditingArmyId] = useEditingArmyId();

    const handleCreateArmy = useCallback(() => {
        const army = parseArmyText('New Army', crypto.randomUUID())
        saveArmy(army);
        setEditingArmyId(army.id);
    }, [saveArmy, setEditingArmyId]);

    const handleSelectArmy = useCallback((armyId: string) => {
        setEditingArmyId(armyId);
    }, [setEditingArmyId]);

    const handleResetArmyStore = useCallback(() => {
        const savedArmyStore = resetArmyStoreToDefault();
        setEditingArmyId(savedArmyStore.orderedIds[0]);
    }, [resetArmyStoreToDefault, setEditingArmyId]);

    return (
        <>
            <ArmyServiceContext.Provider value={armyService}>
                <div className="app-header">
                    <h1 className="app-title">Servitor - Army Editor</h1>
                </div>

                <div className="app-body">
                    <ArmiesNav
                        activeId={editingArmyId}
                        byId={armyStore.byId}
                        onCreateArmy={handleCreateArmy}
                        onResetArmies={handleResetArmyStore}
                        onSelectArmy={handleSelectArmy}
                        orderedIds={armyStore.orderedIds}
                    />

                    <ArmyEditor id={editingArmyId} />
                </div>
            </ArmyServiceContext.Provider>
        </>
    )
}

export default App

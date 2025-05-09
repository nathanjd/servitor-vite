import { useCallback, useEffect, useState } from 'react';
import { IconContext } from '@phosphor-icons/react';

// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { armyService as defaultArmyService } from './lib/army-service';
import { useArmyService } from './hooks/use-army-service';
import { useEditingArmyId } from './hooks/use-editing-army-id';
import { AppHeader } from './components/app-header';
import { ArmyEditor } from './components/army-editor';
import { ArmyServiceContext } from './contexts/army-service-context';
import { ArmiesNav } from './components/armies-nav';
import { parseArmyText } from './lib/parse/parse-army-text';
import { PointsValues } from './lib/suggest/suggest-unit';

const permissionNameWrite: PermissionName = 'clipboard-write' as PermissionName;

const App = (): JSX.Element => {
    const armyService = useArmyService(defaultArmyService);
    const {
        armyStore,
        deleteArmy,
        resetArmyStoreToDefault,
        saveArmy,
    } = armyService;
    const [editingArmyId, setEditingArmyId] = useEditingArmyId();
    const [isArmiesNavOpen, setIsArmiesNavOpen] = useState(true);
    const [pointsValues, setPointsValues] = useState<PointsValues[]>([]);

    // Fetch points and unit name autocomplete values.
    useEffect(() => {
        const urlsToFetch = [
            '/points/munitorum-field-manual-v1.13.json',
            '/points/legends-field-manual-1.0.json',
        ];
        const fetchAndDecode = async (url: string) => {
            const response = await fetch(url);
            return await response.json();
        };
        const requests = urlsToFetch.map(url => fetchAndDecode(url));
        Promise.all(requests).then(json => setPointsValues(json));
    }, []);

    const handleCreateArmy = useCallback(() => {
        const army = parseArmyText('New Army', crypto.randomUUID());
        saveArmy(army);
        setEditingArmyId(army.id);
    }, [saveArmy, setEditingArmyId]);

    const handleDeleteArmy = useCallback((armyId: string) => {
        const savedArmyStore = deleteArmy(armyId);
        if (savedArmyStore.orderedIds.length) {
            setEditingArmyId(savedArmyStore.orderedIds[0]);
        } else {
            handleCreateArmy();
        }
    }, [deleteArmy, handleCreateArmy, setEditingArmyId]);

    const handleExport = useCallback(() => {
        const writeText = () =>
            navigator.clipboard.writeText(JSON.stringify(armyStore))
                .then(() => console.log('clipboard write succeeded'))
                .catch((err) => console.error('clipboard write failed', err));

        navigator.permissions.query({ name: permissionNameWrite })
            .then((result) => {
                if (result.state === 'granted' || result.state === 'prompt') {
                    writeText();
                }
            })
            .catch((err) => {
                // Non-blink browsers do not support the clipboard-write query
                // but allow for writing to the clipboard without it.
                console.error('clipboard permission query errored', err);
                writeText();
            });
    }, [armyStore]);

    const handleSelectArmy = useCallback((armyId: string) => {
        setEditingArmyId(armyId);
    }, [setEditingArmyId]);

    const handleResetArmyStore = useCallback(() => {
        const savedArmyStore = resetArmyStoreToDefault();
        setEditingArmyId(savedArmyStore.orderedIds[0]);

        // TODO: Reset army editor value when default-raw-army-id-1 is selected.
    }, [resetArmyStoreToDefault, setEditingArmyId]);

    return (
        <>
            <IconContext.Provider value={{ size: 32 }}>
                <ArmyServiceContext.Provider value={armyService}>
                    <AppHeader
                        activeId={editingArmyId}
                        isNavOpen={isArmiesNavOpen}
                        onCreateArmy={handleCreateArmy}
                        onDeleteArmy={handleDeleteArmy}
                        onExport={handleExport}
                        setIsNavOpen={setIsArmiesNavOpen}
                    />

                    <div className="app-body">
                        <ArmiesNav
                            activeId={editingArmyId}
                            byId={armyStore.byId}
                            isOpen={isArmiesNavOpen}
                            onResetArmies={handleResetArmyStore}
                            onSelectArmy={handleSelectArmy}
                            orderedIds={armyStore.orderedIds}
                        />

                        <ArmyEditor
                            id={editingArmyId}
                            orderedPointsValues={pointsValues}
                        />
                    </div>
                </ArmyServiceContext.Provider>
            </IconContext.Provider>
        </>
    );
};

export default App;

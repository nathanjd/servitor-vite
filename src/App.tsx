import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconContext } from '@phosphor-icons/react';

// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { armyService as defaultArmyService } from './lib/army-service';
import { pointService as defaultPointService } from './lib/point-service';
import { useArmyService } from './hooks/use-army-service';
import { usePointService } from './hooks/use-point-service';
import { useEditingArmyId } from './hooks/use-editing-army-id';
import { parseArmyText } from './lib/parse/parse-army-text';

// Components
import { AppHeader } from './components/app-header';
import { ArmiesNav } from './components/armies-nav';
import { ArmyEditor } from './components/army-editor';
import { ArmyServiceContext } from './contexts/army-service-context';

const permissionNameWrite: PermissionName = 'clipboard-write' as PermissionName;

const App = (): JSX.Element => {
    const armyService = useArmyService(defaultArmyService);
    const {
        armyStore,
        deleteArmy,
        resetArmyStoreToDefault,
        saveArmy,
    } = armyService;
    const pointService = usePointService(defaultPointService);
    const {
        pointStore,
        fetchPointSources,

        // resetPointStoreToDefault,
        savePointSources,
    } = pointService;
    const [editingArmyId, setEditingArmyId] = useEditingArmyId();
    const [isArmiesNavOpen, setIsArmiesNavOpen] = useState(true);
    const orderedPointSources = useMemo(() => pointStore.orderedIds.map(id => pointStore.byId[id]), [pointStore]);

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

    // Fetch points and unit name autocomplete values.
    useEffect(() => {
        (async () => {
            // TODO: Fetch only the sources that we don't already have. We can't
            // do this yet as I modify the point sources during development. But
            // eventually, this should be okay to do as source files SHOULD
            // never change once generated. Though I could only reasonably
            // guaruntee this for files I hosted myself. I have no control over
            // other users' point source files.

            // Fetch sources from remote.
            //
            // TODO: Should we clear the sources not in this list in case of a
            // new version of the MFM? We can't really do this yet as we're
            // fetching by URL and we don't know their ID until the fetch comes
            // back.
            const pointsSources = await fetchPointSources([
                '/points/munitorum-field-manual-v3.3.json',
                '/points/legends-field-manual-1.0.json',
            ]);

            // Save sources.
            //
            // TODO: Only do so if the ID doesn't already exist in local storage
            // OR it does exist in local storage but the checksum differs.
            await savePointSources(pointsSources);
        })();
    }, [fetchPointSources, savePointSources]);

    return (
        <>
            <IconContext.Provider value={{ size: 32 }}>
                <ArmyServiceContext.Provider value={armyService}>
                    <AppHeader
                        activeId={editingArmyId}
                        isArmiesNavOpen={isArmiesNavOpen}
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
                            orderedPointSources={orderedPointSources}
                        />
                    </div>
                </ArmyServiceContext.Provider>
            </IconContext.Provider>
        </>
    );
};

export default App;

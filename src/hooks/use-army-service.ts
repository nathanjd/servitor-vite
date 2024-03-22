import { useCallback, useState } from 'react';
import { Army } from '../lib/parse-army-text';
import { ArmyStore, ArmyService } from '../lib/army-service';

export const useArmyService = (armyService: ArmyService): ArmyService => {
    const initialArmyStore = armyService.loadArmyStore();
    const [armyStore, setArmyStore] = useState(initialArmyStore);

    const deleteArmy = useCallback((id: string): ArmyStore => {
        const loadedArmyStore = armyService.deleteArmy(id);
        setArmyStore(loadedArmyStore);
        return loadedArmyStore;
    }, [armyService]);

    const loadArmyStore = useCallback((): ArmyStore => {
        const loadedArmyStore = armyService.loadArmyStore();
        setArmyStore(loadedArmyStore);
        return loadedArmyStore;
    }, [armyService]);

    const resetArmyStoreToDefault = useCallback((): ArmyStore => {
        const savedArmyStore = armyService.resetArmyStoreToDefault();
        setArmyStore(savedArmyStore);
        return savedArmyStore;
    }, [armyService]);

    const saveArmy = useCallback((army: Army): ArmyStore => {
        const savedArmyStore = armyService.saveArmy(army);
        setArmyStore(savedArmyStore);
        return savedArmyStore;
    }, [armyService]);

    const saveArmyStore = useCallback((newArmyStore: ArmyStore) => {
        const savedArmyStore = armyService.saveArmyStore(newArmyStore);
        setArmyStore(savedArmyStore);
        return savedArmyStore;
    }, [armyService]);

    return {
        armyStore,
        deleteArmy,
        loadArmyStore,
        resetArmyStoreToDefault,
        saveArmy,
        saveArmyStore,
    };
};

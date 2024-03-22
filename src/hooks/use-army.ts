import { useContext, useEffect } from "react";
import { Army, parseArmyText } from "../lib/parse-army-text";
import { ArmyStore } from "../lib/army-service"
import { ArmyServiceContext } from "../contexts/army-service-context";

export const useArmy = (
    id: string,
): [Army, (army: Army) => ArmyStore] => {
    const {
        armyStore,
        saveArmy,
        saveArmyStore
    } = useContext(ArmyServiceContext);

    // Create army if it doesn't exist in the armyStore.
    const army = armyStore.byId[id] || parseArmyText('', id);

    // Add army to the armyStore if it doesn't exist. This will cause a state
    // change from ArmyServiceContext.
    useEffect(() => {
        if (!armyStore.byId[army.id]) {
            armyStore.byId[army.id] = army;
            armyStore.orderedIds.unshift(army.id);
            saveArmyStore(armyStore);
        }
    }, [army, armyStore, id, saveArmyStore]);

    return [army, saveArmy];
};

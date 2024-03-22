import { Army } from "./parse-army-text.ts";
import { parseDefaultRawArmies } from "../config/default-raw-armies.ts";
import stringify from "json-stable-stringify";

export const armyStoreKey = "armyStore";

export interface ArmyStore {
    byId: { [id: string]: Army };
    orderedIds: string[];
}

export const EmptyArmyStore: ArmyStore = {
    byId: {},
    orderedIds: [],
}

export interface ArmyService {
    armyStore: ArmyStore;
    deleteArmy: (id: string) => ArmyStore;
    loadArmyStore: () => ArmyStore;
    resetArmyStoreToDefault: () => ArmyStore;
    saveArmy: (army: Army) => ArmyStore;
    saveArmyStore: (armyStore: ArmyStore) => ArmyStore;
}

/**
 * Convert an array of armies into an optimal storage format.
 */
export const armiesToArmyStore = (armies: Army[]): ArmyStore => {
    const byId = armies.reduce<{ [id: string]: Army }>((byId, army) => {
        byId[army.id] = army;
        return byId;
    }, ({}));


    const orderedIds = armies.reduce<string[]>((ids, army) => {
        ids.push(army.id);
        return ids;
    }, ([]));

    return {
        byId,
        orderedIds
    };
}

/**
 * Delete an army by ID from local storage.
 */
export const deleteArmy = (id: string): ArmyStore => {
    const armyStore = loadArmyStore();

    if (armyStore.byId[id]) {
        delete armyStore.byId[id];
    }

    // Now is a good time to do some cleanup. Ensure ids are unique while
    // filtering out the deleted id;
    const seenById: { [id: string]: boolean } = {};
    armyStore.orderedIds = armyStore.orderedIds
        .reduce<string[]>((ids, potentialId) => {
            if (!seenById[potentialId] && potentialId !== id) {
                ids.push(potentialId);
                seenById[potentialId] = true;
            }
            return ids;
        }, []);

    saveArmyStore(armyStore);
    return armyStore;
}

/**
 * Load all armies from local storage.
 */
export const loadArmyStore = (): ArmyStore => {
    const armiesJson = localStorage.getItem(armyStoreKey) || "{}";
    let armyStore: ArmyStore;

    try {
        armyStore = JSON.parse(armiesJson);
    } catch (error) {
        console.error("Error parsing armies JSON:", error);
        // Load the default armies if store cannot be parsed.
        const defaultArmies = parseDefaultRawArmies();
        return armiesToArmyStore(defaultArmies);
    }

    // Load the default armies if no store is present.
    if (!Array.isArray(armyStore.orderedIds)) {
        return resetArmyStoreToDefault();
    }

    return armyStore;
};

/**
 *
 */
export const loadArmyById = (id: string): Army | null => {
    const armiesJson = localStorage.getItem(armyStoreKey) || "{}";
    let armyStore: ArmyStore;

    try {
        armyStore = JSON.parse(armiesJson);
    } catch (error) {
        console.error("Error parsing armies JSON:", error);
        return null;
    }

    if (armyStore.byId[id]) {
        return armyStore.byId[id];
    }

    return null;
};

/**
 *
 */
export const loadArmyByName = (name: string): Army | null => {
    const armiesJson = localStorage.getItem(armyStoreKey) || "{}";
    let armyStore: ArmyStore;

    try {
        armyStore = JSON.parse(armiesJson);
    } catch (error) {
        console.error("Error parsing armies JSON:", error);
        return null;
    }

    const armies = Object.values(armyStore.byId);
    for (let i = 0; i < armies.length; i++) {
        if (armies[i].name == name) {
            return armies[i];
        }
    }

    return null;
};

/**
 *
 */
export const resetArmyStoreToDefault = (): ArmyStore => {
    return saveArmies(parseDefaultRawArmies());
};

/**
 *
 */
export const saveArmy = (army: Army): ArmyStore => {
    const armyStore = loadArmyStore();

    // If army is not present in byId, assume it is also not in orderedIds and
    // prepend it.
    if (!armyStore.byId[army.id]) {
        armyStore.orderedIds.unshift(army.id);
    }

    armyStore.byId[army.id] = army;
    saveArmyStore(armyStore);
    return armyStore;
};

/**
 * Save an array of armies to local storage.
 */
export const saveArmies = (armies: Army[]): ArmyStore => {
    const armyStore = armiesToArmyStore(armies);
    saveArmyStore(armyStore);
    return armyStore;
};

/**
 *
 */
export const saveArmyStore = (armyStore: ArmyStore): ArmyStore => {
    localStorage.setItem(armyStoreKey, stringify(armyStore));
    return armyStore;
};

export const armyService: ArmyService = {
    armyStore: Object.assign({}, EmptyArmyStore),
    deleteArmy,
    loadArmyStore,
    resetArmyStoreToDefault,
    saveArmy,
    saveArmyStore,
};

import { Army } from "./parse-army-text.ts";
import { parseDefaultRawArmies } from "../config/default-raw-armies.ts";

export const armyStoreKey = "armyStore";

export interface ArmyStore {
    byName: { [id: string]: Army };
    orderedNames: string[];
}

/**
 * Convert an array of armies into an optimal storage format.
 */
export const armiesToArmyStore = (armies: Army[]): ArmyStore => {
    const byName = armies.reduce<{ [id: string]: Army }>((byName, army) => {
        byName[army.name] = army;
        return byName;
    }, ({}));

    const orderedNames = armies.reduce<string[]>((names, army) => {
        names.push(army.name);
        return names;
    }, ([]));

    return {
        byName,
        orderedNames
    };
}

/**
 * Load all armies from local storage.
 */
export const loadArmyStore = (): ArmyStore => {
    const armiesJson = localStorage.getItem(armyStoreKey) || "{}";
    let armyStore;

    try {
        armyStore = JSON.parse(armiesJson);
    } catch (error) {
        console.error("Error parsing armies JSON:", error);
    }

    // console.log("armies", armies)

    if (!Array.isArray(armyStore.orderedNames)) {
        const defaultArmies = parseDefaultRawArmies();
        armyStore = armiesToArmyStore(defaultArmies);
    }

    // console.log("parsedArmies", armies)

    return armyStore;
};

/**
 *
 */
export const loadArmyByName = (name: string): Army => {
    const armiesJson = localStorage.getItem(armyStoreKey) || "{}";
    let armyStore;

    try {
        armyStore = JSON.parse(armiesJson);
    } catch (error) {
        console.error("Error parsing armies JSON:", error);
    }

    return armyStore[name];
};

/**
 *
 */
export const resetArmiesToDefault = () => {
    saveArmies(parseDefaultRawArmies());
};

/**
 *
 */
export const saveArmy = (army: Army) => {
    const armyStore = loadArmyStore();
    armyStore.byName[army.name] = army;
    saveArmyStore(armyStore);
};

/**
 * Save an array of armies to local storage.
 */
export const saveArmies = (armies: Army[]) => {
    if (!Array.isArray(armies)) {
        console.log("Escaping from bad army save", Array.isArray(armies));
        return;
    }

    const armyStore = armiesToArmyStore(armies);
    saveArmyStore(armyStore);
};

/**
 *
 */
export const saveArmyStore = (armyStore: ArmyStore) => {
    localStorage.setItem(armyStoreKey, JSON.stringify(armyStore));
};

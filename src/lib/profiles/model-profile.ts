export interface ModelProfile {
    name            : string;
    leadership      : number;
    move            : number;
    objectiveControl: number;
    armorSave       : number;
    invulnerableSave: number;
    toughness       : number;
    wounds          : number;
    keywords        : string[];
}

/**
 * Takes a save (ex: 3+) and returns the chance of failing it on a d6. Range:
 * 0-1.
 */
export const getUnsavedChance = (save: number): number => {
    if (save > 6) {
        return 1;
    }

    // A roll of 1 always fails so a save better than 2+ has no effect.
    if (save < 2) {
        return 1 / 6;
    }

    return 1 - (6 - save + 1) / 6;
};

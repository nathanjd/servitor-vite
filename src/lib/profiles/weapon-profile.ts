export interface WeaponProfile {
    name: string;

    armorPenetration: number;
    attacks         : string;
    damage          : string;

    // A 3 scores a Hit on a hit roll of 3+.
    hitSkill: number;
    range   : number;
    strength: number;
    keywords: string[];

    // A 5 scores a Critical Hit on an unmodified hit roll of 5+.
    criticalHitSkill?: number;

    // A 6 scores a Critical Wound on an unmodified wound roll of 6.
    criticalWoundSkill?: number;
}

/**
 * Takes a hit skill (ex: 3+) and returns the chance of passing it on a d6. A
 * hit chance of Infinity will return an automatic hit. Range: 0-1.
 */
export const getHitChance = (hitSkill: number): number => {
    // A hit skill of negative Infinity will be considered an automatic hit. For
    // example, weapons with the torrent keyword.
    if (hitSkill === -Infinity) {
        return 1;
    }

    // A roll of 1 always fails so a hit skill better than 2+ has no effect.
    if (hitSkill > 6) {
        return 1 / 6;
    }

    // A roll of 6 always succeeds so a hit skill worse than 6+ has no
    // effect.
    if (hitSkill < 2) {
        return 5 / 6;
    }

    return (7 - hitSkill) / 6;
};

/**
 * Takes the attacker's strength and defender's toughness and returns the
 * chance of passing the wound roll on a d6. Range: 0-1.
 */
export const getWoundChance = (strength: number, toughness: number): number => {
    if (strength === Infinity) {
        return 1;
    }

    if (strength >= toughness * 2) {
        return 5 / 6;
    }

    if (strength * 2 <= toughness) {
        return 1 / 6;
    }

    if (strength > toughness) {
        return 4 / 6;
    }

    if (strength < toughness) {
        return 2 / 6;
    }

    return 3 / 6;
};

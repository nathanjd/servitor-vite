import { averageForDiceExpression } from './average-for-dice-expression';

export interface WeaponProfile {
    armorPenetration: number;
    attacks         : string;
    damage          : string;
    hitSkill        : number;
    range           : number;
    strength        : number;
    keywords        : string[];
}

export interface ModelProfile {
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
 * Takes a hit skill (ex: 3+) and returns the chance of passing it on a d6.
 * Range: 0-1.
 */
const getHitChance = (hitSkill: number): number => (6 - hitSkill) / 6;

/**
 * Takes a save (ex: 3+) and returns the chance of failing it on a d6. Range:
 * 0-1.
 */
const unsavedChance = (save: number): number => {
    if (save >= 7) {
        return 1;
    }

    return 1 - (6 - save + 1) / 6;
};

/**
 * Takes the attacker's strength and defender's toughness and returns the
 * chance of passing the wound roll on a d6. Range: 0-1.
 */
const woundChance = (strength: number, toughness: number): number => {
    if (strength >= toughness * 2) {
        return 5 / 6;
    }

    if (strength * 2 < toughness) {
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

/**
 * Returns the average damage caused by all passed weapons if fired at the
 * target model. It is the caller's responsibility to filter the input for
 * weapons that cannot be fired together.
 */
export const averageWeaponDamage = (
    weapons: WeaponProfile[],
    targetModel: ModelProfile,
) => {
    // Assume all weapons can attack.
    const damagePerWeapon = weapons.map((weapon) => {
        const {
            armorPenetration,
            attacks,
            damage,
            hitSkill,
            keywords: weaponKeywords,
            strength,
        } = weapon;
        const {
            armorSave,
            invulnerableSave,
            toughness,
            wounds,
        } = targetModel;

        // TODO: Compute modifiers from more than just heavy.
        // TODO: Accept config for whether unit moved or not.
        const hitSkillModifier = weaponKeywords.includes('heavy') ? 1 : 0;
        const hitChance = weaponKeywords.includes('torrent') ?
            1 : getHitChance(hitSkill - hitSkillModifier);
        const effectiveAttacks = averageForDiceExpression(attacks);
        const averageHits = effectiveAttacks * hitChance;
        const effectiveArmorSave = armorSave + armorPenetration;
        const save = Math.min(effectiveArmorSave, invulnerableSave);
        const averageWounds =
            averageHits * woundChance(strength, toughness);
        const averageUnsavedWounds = averageWounds * unsavedChance(save);

        // Weakly ensure damage from a single attack does not spill over to
        // another model.
        // TODO: Account for consecutive hits. Ex: A 2 damage weapon against
        // 3 wound models would only have effective damage 1 on every other
        // unsaved wound.
        // TODO: Account for feel no pain. Damage higher than the model's max
        // wounds is still useful against feel no pain.
        const effectiveDamage =
            Math.min(averageForDiceExpression(damage), wounds);

        return averageUnsavedWounds * effectiveDamage;
    });

    const averageDamage = damagePerWeapon
        .reduce((sum, wounds) => sum + wounds, 0);

    return averageDamage;
};

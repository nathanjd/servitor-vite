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

export interface WeaponRollResult {
    hits         : number;
    wounds       : number;
    unsavedWounds: number;
    damage       : number;
}

// Called when computing an attack roll's effective stats (such as strength or
// armor save). Takes the attacking weapon, defending model and the current
// modified context before running this modifier to return the modified conext.
// Base stats can be looked up in originalContext. Never modify originalContext!
export interface AttackModifierFunction {
    (
        currentContext: AttackContext,
        originalContext: AttackContext,
    ): AttackContext;
}

// All the context needed to compute a mean weapon roll.
export interface AttackContext {
    weapon     : WeaponProfile;
    targetModel: ModelProfile;
    modifiers  : AttackModifierFunction[];
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

/**
 * Returns the mean result of an attack roll for the passed weapon if fired at
 * the target model.
 */
export const meanWeaponRoll = (context: AttackContext) => {
    // Process all modifiers successively.
    const effectiveContext = context.modifiers.reduce(
        (modifiedContext, modifier) => modifier(modifiedContext, context),

        // Clone context so that mutations don't affect the original context.
        {
            // This clone assumes weapon has no nested properties.
            weapon: Object.assign(context.weapon),

            // This clone assumes targetModel has no nested properties.
            targetModel: Object.assign(context.targetModel),

            // No reason to clone modifiers as these should not be mutated.
            modifiers: context.modifiers,
        },
    );

    const {
        armorPenetration,
        attacks,
        damage,
        hitSkill,
        strength,
    } = effectiveContext.weapon;
    const {
        armorSave,
        invulnerableSave,
        toughness,
        wounds,
    } = effectiveContext.targetModel;

    const hitChance = getHitChance(hitSkill);
    const effectiveAttacks = averageForDiceExpression(attacks);
    const meanHits = effectiveAttacks * hitChance;

    const effectiveArmorSave = armorSave + armorPenetration;
    const save = Math.min(effectiveArmorSave, invulnerableSave);
    const meanWounds = meanHits * getWoundChance(strength, toughness);
    const meanUnsavedWounds = meanWounds * getUnsavedChance(save);

    // Weakly ensure damage from a single attack does not spill over to
    // another model.
    // TODO: Account for consecutive hits. Ex: A 2 damage weapon against
    // 3 wound models would only have effective damage 1 on every other
    // unsaved wound.
    // TODO: Account for feel no pain. Damage higher than the model's max
    // wounds is still useful against feel no pain.
    const effectiveDamage =
        Math.min(averageForDiceExpression(damage), wounds);

    const meanDamage = meanUnsavedWounds * effectiveDamage;
    return {
        hits         : meanHits,
        wounds       : meanWounds,
        unsavedWounds: meanUnsavedWounds,
        damage       : meanDamage,
    };
};

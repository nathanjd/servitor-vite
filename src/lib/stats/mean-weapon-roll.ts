import { averageForDiceExpression } from './average-for-dice-expression';
import { AttackContext, cloneContext } from './context/attack-context';
import { getHitChance, getWoundChance } from '../profiles/weapon-profile';
import { getUnsavedChance } from '../profiles/model-profile';

export interface WeaponRollResult {
    hits         : number;
    wounds       : number;
    unsavedWounds: number;
    damage       : number;
}

// The result of a single attack roll.
export interface AttackResult {
    hits         : number;
    wounds       : number;
    unsavedWounds: number;
    damage       : number;
}

// The result of a single attack roll with extra attacks. The extra attacks will
// need to be rolled recursively until there are none left.
export interface IntermediateAttackResult {
    attackResult: AttackResult;
    extraAttacks: number;
}

/**
 * Returns the mean result of single attack roll for the passed weapon against
 * the target model.
 */
export const meanAttackRoll = (context: AttackContext): AttackResult => {
    // Process all modifiers successively.
    const effectiveContext = context.modifiers.reduce(
        (modifiedContext, modifier) => modifier(modifiedContext, context),

        // Clone context so that mutations don't affect the original context.
        cloneContext(context),
    );

    const {
        armorPenetration,

        // attacks,
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

    // TODO: Modify crit chance with context.
    const criticalHitChance = 1 / 6;
    const noncriticalHitChance = criticalHitChance - hitChance;

    // non-critical hit
    const effectiveArmorSave = armorSave + armorPenetration;
    const save = Math.min(effectiveArmorSave, invulnerableSave);
    const meanWounds = noncriticalHitChance *
        getWoundChance(strength, toughness);
    const meanUnsavedWounds = meanWounds * getUnsavedChance(save);

    // critical hit
    const criticalHitContext = context.criticalHitModifiers.reduce(
        (modifiedContext, modifier) => modifier(modifiedContext, context),

        // Clone context so that mutations don't affect the original context.
        cloneContext(context),
    );

    const criticalEffectiveArmorSave =
        criticalHitContext.targetModel.armorSave +
        criticalHitContext.weapon.armorPenetration;
    const criticalSave = Math.min(effectiveArmorSave, invulnerableSave);
    const meanCriticalWounds = 0;

    // critical wound
    const criticalWoundContext = context.criticalWoundModifiers.reduce(
        (modifiedContext, modifier) => modifier(modifiedContext, context),

        // Clone context so that mutations don't affect the original context.
        cloneContext(context),
    );


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

/**
 * Returns the mean result of an attack roll for the passed weapon if fired at
 * the target model.
 */
export const meanWeaponRoll = (context: AttackContext) => {
    // Process all modifiers successively.
    const effectiveContext = context.modifiers.reduce(
        (modifiedContext, modifier) => modifier(modifiedContext, context),

        // Clone context so that mutations don't affect the original context.
        cloneContext(context),
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

    // TODO: add criticalHitModifiers?
    // const meanCriticalHits = effectiveAttacks * (1 / 6);
    // const meanNonCriticalHits = meanHits - meanCriticalHits;

    // const criticalHitContext = context.modifiers.reduce(
    //     (modifiedContext, modifier) => modifier(modifiedContext, context),

    //     // Clone context so that mutations don't affect the original context.
    //     {
    //         // This clone assumes weapon has no nested properties.
    //         weapon: Object.assign(context.weapon),

    //         // This clone assumes targetModel has no nested properties.
    //         targetModel: Object.assign(context.targetModel),

    //         // No reason to clone modifiers as these should not be mutated.
    //         modifiers: context.modifiers,
    //     },
    // );

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

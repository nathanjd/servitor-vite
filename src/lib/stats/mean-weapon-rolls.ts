import { AttackModifierFunction } from './context/attack-context.ts';
import { WeaponProfile } from '../profiles/weapon-profile.ts';
import { ModelProfile } from '../profiles/model-profile.ts';
import { WeaponRollResult } from './mean-weapon-roll.ts';
import { meanWeaponRoll } from './mean-weapon-roll';

/**
 * Returns the mean result of an attack roll for all passed weapons if fired at
 * the target model. It is the caller's responsibility to filter the input for
 * weapons that cannot be fired together.
 */
export const meanWeaponRolls = (
    weapons: WeaponProfile[],
    targetModel: ModelProfile,
    modifiers: AttackModifierFunction[],
): WeaponRollResult => {
    // Assume all weapons can attack.
    const rollPerWeapon = weapons
        .map((weapon) => meanWeaponRoll({
            weapon,
            targetModel,
            modifiers,
            criticalHitModifiers  : [],
            criticalWoundModifiers: [],
        }));

    const meanHits = rollPerWeapon
        .reduce((sum, roll) => sum + roll.hits, 0);
    const meanWounds = rollPerWeapon
        .reduce((sum, roll) => sum + roll.wounds, 0);
    const meanUnsavedWounds = rollPerWeapon
        .reduce((sum, roll) => sum + roll.unsavedWounds, 0);
    const meanDamage = rollPerWeapon
        .reduce((sum, roll) => sum + roll.damage, 0);

    return {
        hits         : meanHits,
        wounds       : meanWounds,
        unsavedWounds: meanUnsavedWounds,
        damage       : meanDamage,
    };
};

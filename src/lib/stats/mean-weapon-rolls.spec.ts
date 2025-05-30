import { describe, expect, it } from 'vitest';

import { AttackModifierFunction } from './context/attack-context.ts';
import { WeaponProfile } from '../profiles/weapon-profile.ts';
import { ModelProfile } from '../profiles/model-profile.ts';
import { WeaponRollResult } from './mean-weapon-roll.ts';

import { meanWeaponRolls } from './mean-weapon-rolls.ts';

import { dreadnaught } from '../../config/default-model-profiles.ts';
import { laspistol, lascannon } from '../../config/default-weapon-profiles.ts';

describe('meanWeaponRolls', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedRolls = (
        weapons: WeaponProfile[],
        model: ModelProfile,
        attackModifiers: AttackModifierFunction[],
    ): WeaponRollResult  => {
        const roll = meanWeaponRolls(weapons, model, attackModifiers);
        return {
            hits         : round(roll.hits),
            wounds       : round(roll.wounds),
            unsavedWounds: round(roll.unsavedWounds),
            damage       : round(roll.damage),
        };
    };

    it('should return 0 for each mean when passed no weapons', () => {
        const rolls = roundedRolls([], dreadnaught, []);
        expect(rolls.hits).to.equal(0);
        expect(rolls.wounds).to.equal(0);
        expect(rolls.unsavedWounds).to.equal(0);
        expect(rolls.damage).to.equal(0);
    });

    it('should return the sum of each mean', () => {
        const rolls = roundedRolls([laspistol, lascannon], dreadnaught, []);
        expect(rolls.hits).to.equal(0.833);
        expect(rolls.wounds).to.equal(0.389);
        expect(rolls.unsavedWounds).to.equal(0.231);
        expect(rolls.damage).to.equal(1.009);
    });
});

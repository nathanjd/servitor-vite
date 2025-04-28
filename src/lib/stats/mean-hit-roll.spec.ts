import { describe, expect, it } from 'vitest';

import {
    AttackModifierFunction,
    HitModifierFunction,
} from './context/attack-context.ts';

import { WeaponProfile } from '../profiles/weapon-profile';
import { ModelProfile } from '../profiles/model-profile';

import { meanHitRoll, HitRollResult } from './mean-hit-roll';

import { guardsmen } from '../../config/default-model-profiles.ts';

import { heavyModifier } from '../../config/default-attack-modifiers.ts';
import { lethalHitsModifier, sustainedHitsModifier } from '../../config/default-critical-hit-modifiers.ts';

describe('meanHitRoll(attackContext)', () => {
    const weaponWith = (
        hitSkill: number, keywords: string[] = [],
    ): WeaponProfile => ({
        name            : 'Test Weapon',
        range           : 12,
        attacks         : '1',
        hitSkill,
        strength        : 3,
        armorPenetration: 0,
        damage          : '1',
        keywords,
    });

    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedMeanHitRoll = (
        weapon: WeaponProfile,
        targetModel: ModelProfile,
        modifiers: AttackModifierFunction[] = [],
        criticalHitModifiers: HitModifierFunction[] = [],
        criticalWoundModifiers: AttackModifierFunction[] = [],
    ): HitRollResult => {
        const meanHitRollResult = meanHitRoll({
            weapon,
            targetModel,
            modifiers,
            criticalHitModifiers,
            criticalWoundModifiers,
        });
        return {
            ...meanHitRollResult,
            meanHits        : round(meanHitRollResult.meanHits),
            meanCriticalHits: round(meanHitRollResult.meanCriticalHits),
        };
    };
    const roundedHits = (
        weapon: WeaponProfile,
        targetModel: ModelProfile,
        modifiers: AttackModifierFunction[] = [],
        criticalHitModifiers: HitModifierFunction[] = [],
        criticalWoundModifiers: AttackModifierFunction[] = [],
    ) => roundedMeanHitRoll(
        weapon,
        targetModel,
        modifiers,
        criticalHitModifiers,
        criticalWoundModifiers,
    ).meanHits;

    const roundedCrits = (
        weapon: WeaponProfile,
        targetModel: ModelProfile,
        modifiers: AttackModifierFunction[] = [],
        criticalHitModifiers: HitModifierFunction[] = [],
        criticalWoundModifiers: AttackModifierFunction[] = [],
    ) => roundedMeanHitRoll(
        weapon,
        targetModel,
        modifiers,
        criticalHitModifiers,
        criticalWoundModifiers,
    ).meanCriticalHits;

    it.each([
        { hitSkill: 1,  hits: 0.667 },
        { hitSkill: 2,  hits: 0.667 },
        { hitSkill: 3,  hits: 0.5 },
        { hitSkill: 4,  hits: 0.333 },
        { hitSkill: 5,  hits: 0.167 },
        { hitSkill: 6,  hits: 0 },
        { hitSkill: 7,  hits: 0 },
    ])('BS $hitSkill+ -> $hits hits', ({ hitSkill, hits }) => {
        expect(roundedHits(weaponWith(hitSkill), guardsmen)).to.equal(hits);
    });

    it.each([
        { hitSkill: 1,  crits: 0.167 },
        { hitSkill: 2,  crits: 0.167 },
        { hitSkill: 3,  crits: 0.167 },
        { hitSkill: 4,  crits: 0.167 },
        { hitSkill: 5,  crits: 0.167 },
        { hitSkill: 6,  crits: 0.167 },
        { hitSkill: 7,  crits: 0.167 },
    ])('BS $hitSkill+ -> $crits critical hits', ({ hitSkill, crits }) => {
        expect(roundedCrits(weaponWith(hitSkill), guardsmen)).to.equal(crits);
    });

    it('should account for the torrent keyword', () => {
        const weapon = weaponWith(-Infinity, ['torrent']);
        expect(roundedHits(weapon, guardsmen, [heavyModifier]))
            .to.equal(1);
        expect(roundedCrits(weapon, guardsmen, [heavyModifier]))
            .to.equal(0);
    });

    it('should account for the heavy keyword', () => {
        const weapon = weaponWith(4, ['heavy']);
        expect(roundedHits(weapon, guardsmen, [heavyModifier]))
            .to.equal(0.5);
        expect(roundedCrits(weapon, guardsmen, [heavyModifier]))
            .to.equal(0.167);
    });

    it('should account for the sustained hits 1 keyword', () => {
        const weapon = weaponWith(4, ['sustained hits 1']);
        expect(roundedHits(
            weapon, guardsmen, [heavyModifier], [sustainedHitsModifier],
        )).to.equal(0.5);
        expect(roundedCrits(
            weapon, guardsmen, [heavyModifier], [sustainedHitsModifier],
        )).to.equal(0.167);
    });

    it('should account for the sustained hits 2 keyword', () => {
        const weapon = weaponWith(4, ['sustained hits 2']);
        expect(roundedHits(
            weapon, guardsmen, [heavyModifier], [sustainedHitsModifier],
        )).to.equal(0.667);
        expect(roundedCrits(
            weapon, guardsmen, [heavyModifier], [sustainedHitsModifier],
        )).to.equal(0.167);
    });

    it('should account for the lethal hits keyword', () => {
        const weapon = weaponWith(4, ['lethal hits']);
        const meanRollResult = roundedMeanHitRoll(
            weapon, guardsmen, [heavyModifier], [lethalHitsModifier]);

        expect(meanRollResult.criticalHitContext.weapon.strength)
            .to.equal(Infinity);
    });
});

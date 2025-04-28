import { describe, expect, it } from 'vitest';

import {
    meanAttackRoll,
    AttackModifierFunction,
    ModelProfile,
    WeaponProfile,
    AttackContext,
} from './mean-weapon-roll';

import {
    guardsmen,
    spaceMarine,
    terminator,
    sentinel,
    dreadnaught,
    trukk,
    rhino,
    predator,
    landRaider,
    knight,
} from '../../config/default-model-profiles.ts';

import {
    autocannon,
    boltgun,
    boltPistol,
    combiBolter,
    flamer,
    lascannon,
    lasgun,
    laspistol,
    plasmaPistol,
    plasmaPistolSupercharge,
} from '../../config/default-weapon-profiles.ts';

describe('meanAttackRoll(attackContext)', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedDamage = (
        weapon: WeaponProfile,
        targetModel: ModelProfile,
        modifiers: AttackModifierFunction[] = [],
        criticalHitModifiers: AttackModifierFunction[] = [],
        criticalWoundModifiers: AttackModifierFunction[] = [],
    ) =>
        round(meanAttackRoll({
            weapon,
            targetModel,
            modifiers,
            criticalHitModifiers,
            criticalWoundModifiers,
        }).damage);

    it('should return the correct damage for weapons with no effective modifiers', () => {
        expect(roundedDamage(laspistol, guardsmen)).to.equal(0.167);
        expect(roundedDamage(laspistol, spaceMarine)).to.equal(0.056);
        expect(roundedDamage(laspistol, terminator)).to.equal(0.028);
        expect(roundedDamage(laspistol, sentinel)).to.equal(0.028);
        expect(roundedDamage(laspistol, dreadnaught)).to.equal(0.014);
        expect(roundedDamage(laspistol, trukk)).to.equal(0.042);
        expect(roundedDamage(laspistol, rhino)).to.equal(0.028);
        expect(roundedDamage(laspistol, predator)).to.equal(0.028);
        expect(roundedDamage(laspistol, landRaider)).to.equal(0.014);
        expect(roundedDamage(laspistol, knight))
            .to.equal(0.028);
    });
});

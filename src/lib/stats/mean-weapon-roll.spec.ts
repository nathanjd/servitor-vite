import { describe, expect, it } from 'vitest';

import {
    AttackModifierFunction,
    meanWeaponRoll,
    ModelProfile,
    WeaponProfile,
} from './mean-weapon-roll.ts';

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

import {
    benefitOfCoverModifier,
    heavyModifier,
    rapidFireModifier,
} from '../../config/default-attack-modifiers.ts';

describe('meanWeaponRoll(weapons, targetModel)', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedDamage = (
        weapon: WeaponProfile,
        targetModel: ModelProfile,
        modifiers: AttackModifierFunction[],
    ) =>
        round(meanWeaponRoll({ weapon, targetModel, modifiers }).damage);

    it('should return the correct damage for weapons with no effective modifiers', () => {
        expect(roundedDamage(laspistol, guardsmen, [])).to.equal(0.167);
        expect(roundedDamage(laspistol, spaceMarine, [])).to.equal(0.056);
        expect(roundedDamage(laspistol, terminator, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, sentinel, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, dreadnaught, [])).to.equal(0.014);
        expect(roundedDamage(laspistol, trukk, [])).to.equal(0.042);
        expect(roundedDamage(laspistol, rhino, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, predator, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, landRaider, [])).to.equal(0.014);
        expect(roundedDamage(laspistol, knight, []))
            .to.equal(0.028);

        expect(roundedDamage(boltPistol, guardsmen, [])).to.equal(0.296);
        expect(roundedDamage(boltPistol, spaceMarine, [])).to.equal(0.111);
        expect(roundedDamage(boltPistol, terminator, [])).to.equal(0.037);
        expect(roundedDamage(boltPistol, sentinel, [])).to.equal(0.074);
        expect(roundedDamage(boltPistol, dreadnaught, [])).to.equal(0.019);
        expect(roundedDamage(boltPistol, trukk, [])).to.equal(0.056);
        expect(roundedDamage(boltPistol, rhino, [])).to.equal(0.037);
        expect(roundedDamage(boltPistol, predator, [])).to.equal(0.037);
        expect(roundedDamage(boltPistol, landRaider, [])).to.equal(0.019);
        expect(roundedDamage(boltPistol, knight, []))
            .to.equal(0.037);

        expect(roundedDamage(boltgun, guardsmen, [])).to.equal(0.593);
        expect(roundedDamage(boltgun, spaceMarine, [])).to.equal(0.222);
        expect(roundedDamage(boltgun, terminator, [])).to.equal(0.074);
        expect(roundedDamage(boltgun, sentinel, [])).to.equal(0.148);
        expect(roundedDamage(boltgun, dreadnaught, [])).to.equal(0.037);
        expect(roundedDamage(boltgun, trukk, [])).to.equal(0.111);
        expect(roundedDamage(boltgun, rhino, [])).to.equal(0.074);
        expect(roundedDamage(boltgun, predator, [])).to.equal(0.074);
        expect(roundedDamage(boltgun, landRaider, [])).to.equal(0.037);
        expect(roundedDamage(boltgun, knight, [])).to.equal(0.074);

        expect(roundedDamage(plasmaPistol, guardsmen, [])).to.equal(0.556);
        expect(roundedDamage(plasmaPistol, spaceMarine, [])).to.equal(0.296);
        expect(roundedDamage(plasmaPistol, terminator, [])).to.equal(0.222);
        expect(roundedDamage(plasmaPistol, sentinel, [])).to.equal(0.222);
        expect(roundedDamage(plasmaPistol, dreadnaught, [])).to.equal(0.111);
        expect(roundedDamage(plasmaPistol, trukk, [])).to.equal(0.185);
        expect(roundedDamage(plasmaPistol, rhino, [])).to.equal(0.148);
        expect(roundedDamage(plasmaPistol, predator, [])).to.equal(0.148);
        expect(roundedDamage(plasmaPistol, landRaider, [])).to.equal(0.111);
        expect(roundedDamage(plasmaPistol, knight, []))
            .to.equal(0.148);

        expect(roundedDamage(plasmaPistolSupercharge, guardsmen, []))
            .to.equal(0.556);
        expect(roundedDamage(plasmaPistolSupercharge, spaceMarine, []))
            .to.equal(0.296);
        expect(roundedDamage(plasmaPistolSupercharge, terminator, []))
            .to.equal(0.222);
        expect(roundedDamage(plasmaPistolSupercharge, sentinel, []))
            .to.equal(0.222);
        expect(roundedDamage(plasmaPistolSupercharge, dreadnaught, []))
            .to.equal(0.111);
        expect(roundedDamage(plasmaPistolSupercharge, trukk, []))
            .to.equal(0.185);
        expect(roundedDamage(plasmaPistolSupercharge, rhino, []))
            .to.equal(0.148);
        expect(roundedDamage(plasmaPistolSupercharge, predator, []))
            .to.equal(0.148);
        expect(roundedDamage(plasmaPistolSupercharge, landRaider, []))
            .to.equal(0.111);
        expect(roundedDamage(plasmaPistolSupercharge, knight, []))
            .to.equal(0.148);
    });

    it('should return the correct damage for weapons againsts defenders with the benefit of cover', () => {
        const cover = benefitOfCoverModifier;
        expect(roundedDamage(laspistol, guardsmen, [cover]))
            .to.equal(0.125); // vs 0.167 without cover
        expect(roundedDamage(laspistol, spaceMarine, [cover]))
            .to.equal(0.056); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, terminator, [cover]))
            .to.equal(0.028); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(laspistol, sentinel, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, dreadnaught, [cover]))
            .to.equal(0.014); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(laspistol, trukk, [cover]))
            .to.equal(0.028); // vs 0.042 without cover
        expect(roundedDamage(laspistol, rhino, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, predator, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, landRaider, [cover]))
            .to.equal(0.014); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(laspistol, knight, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)

        expect(roundedDamage(plasmaPistol, guardsmen, [cover]))
            .to.equal(0.37); // vs 0.556 without cover
        expect(roundedDamage(plasmaPistol, spaceMarine, [cover]))
            .to.equal(0.222); // vs 0.296 without cover
        expect(roundedDamage(plasmaPistol, terminator, [cover]))
            .to.equal(0.148); // vs 0.222 without cover
        expect(roundedDamage(plasmaPistol, sentinel, [cover]))
            .to.equal(0.167); // vs 0.222 without cover
        expect(roundedDamage(plasmaPistol, dreadnaught, [cover]))
            .to.equal(0.074); // vs 0.111 without cover
        expect(roundedDamage(plasmaPistol, trukk, [cover]))
            .to.equal(0.111); // vs 0.185 without cover
        expect(roundedDamage(plasmaPistol, rhino, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
        expect(roundedDamage(plasmaPistol, predator, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
        expect(roundedDamage(plasmaPistol, landRaider, [cover]))
            .to.equal(0.074); // vs 0.111 without cover
        expect(roundedDamage(plasmaPistol, knight, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
    });

    it('should return the correct damage for weapons with torrent', () => {
        expect(roundedDamage(flamer, guardsmen, [])).to.equal(1.556);
        expect(roundedDamage(flamer, spaceMarine, [])).to.equal(0.583);
        expect(roundedDamage(flamer, terminator, [])).to.equal(0.194);
        expect(roundedDamage(flamer, sentinel, [])).to.equal(0.389);
        expect(roundedDamage(flamer, dreadnaught, [])).to.equal(0.097);
        expect(roundedDamage(flamer, trukk, [])).to.equal(0.292);
        expect(roundedDamage(flamer, rhino, [])).to.equal(0.194);
        expect(roundedDamage(flamer, predator, [])).to.equal(0.194);
        expect(roundedDamage(flamer, landRaider, [])).to.equal(0.097);
        expect(roundedDamage(flamer, knight, []))
            .to.equal(0.194);
    });

    it('should return the correct damage for weapons with heavy whose model did not move', () => {
        const heavy = heavyModifier;
        expect(roundedDamage(autocannon, guardsmen, [heavy]))
            .to.equal(0.926);
        expect(roundedDamage(autocannon, spaceMarine, [heavy]))
            .to.equal(1.389);
        expect(roundedDamage(autocannon, terminator, [heavy]))
            .to.equal(1.111);
        expect(roundedDamage(autocannon, sentinel, [heavy]))
            .to.equal(1.667);
        expect(roundedDamage(autocannon, dreadnaught, [heavy]))
            .to.equal(0.833);
        expect(roundedDamage(autocannon, trukk, [heavy]))
            .to.equal(2.222);
        expect(roundedDamage(autocannon, rhino, [heavy]))
            .to.equal(1.25);
        expect(roundedDamage(autocannon, predator, [heavy]))
            .to.equal(0.833);
        expect(roundedDamage(autocannon, landRaider, [heavy]))
            .to.equal(0.556);
        expect(roundedDamage(autocannon, knight, [heavy]))
            .to.equal(0.833);
    });

    it('should return the correct damage for weapons with rapid fire in half range', () => {
        const rapidFire = rapidFireModifier;

        // Outside half range.
        expect(roundedDamage(lasgun, guardsmen, []))
            .to.equal(0.167);

        // Within half range.
        expect(roundedDamage(lasgun, guardsmen, [rapidFire]))
            .to.equal(0.333);
        expect(roundedDamage(lasgun, spaceMarine, [rapidFire]))
            .to.equal(0.167);
        expect(roundedDamage(lasgun, terminator, [rapidFire]))
            .to.equal(0.111);
        expect(roundedDamage(lasgun, sentinel, [rapidFire]))
            .to.equal(0.139);
        expect(roundedDamage(lasgun, dreadnaught, [rapidFire]))
            .to.equal(0.083);
        expect(roundedDamage(lasgun, trukk, [rapidFire]))
            .to.equal(0.292);
        expect(roundedDamage(lasgun, rhino, [rapidFire]))
            .to.equal(0.222);
        expect(roundedDamage(lasgun, predator, [rapidFire]))
            .to.equal(0.25);
        expect(roundedDamage(lasgun, landRaider, [rapidFire]))
            .to.equal(0.139);
        expect(roundedDamage(lasgun, knight, [rapidFire]))
            .to.equal(0.306);

        // Outside half range (rapid fire 2)
        expect(roundedDamage(combiBolter, guardsmen, []))
            .to.equal(0.593);

        // Within half range (rapid fire 2)
        expect(roundedDamage(combiBolter, guardsmen, [rapidFire]))
            .to.equal(1.185);
    });

    it('should return the correct damage for weapons with variable damage', () => {
        expect(roundedDamage(lascannon, guardsmen, [])).to.equal(0.417);
        expect(roundedDamage(lascannon, spaceMarine, [])).to.equal(0.694);
        expect(roundedDamage(lascannon, terminator, [])).to.equal(0.625);
        expect(roundedDamage(lascannon, sentinel, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, dreadnaught, [])).to.equal(1);
        expect(roundedDamage(lascannon, trukk, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, rhino, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, predator, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, landRaider, [])).to.equal(0.75);
        expect(roundedDamage(lascannon, knight, [])).to.equal(0.75);
    });
});

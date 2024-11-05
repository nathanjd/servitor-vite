import { describe, expect, it } from 'vitest';

import {
    AttackModifierFunction,
    meanWeaponRoll,
    ModelProfile,
    WeaponProfile,
} from './mean-weapon-roll.ts';

import {
    lightInfantry,
    heavyInfantry,
    eliteInfantry,
    lightWalker,
    heavyWalker,
    lightTransport,
    heavyTransport,
    lightTank,
    heavyTank,
    superHeavyWalker,
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

    it('should debug', () => {
        expect(roundedDamage(plasmaPistol, eliteInfantry, [benefitOfCoverModifier]))
            .to.equal(0.111); // vs 0.167 without cover
    });

    it('should return the correct damage for weapons with no effective modifiers', () => {
        expect(roundedDamage(laspistol, lightInfantry, [])).to.equal(0.167);
        expect(roundedDamage(laspistol, heavyInfantry, [])).to.equal(0.056);
        expect(roundedDamage(laspistol, eliteInfantry, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, lightWalker, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, heavyWalker, [])).to.equal(0.014);
        expect(roundedDamage(laspistol, lightTransport, [])).to.equal(0.042);
        expect(roundedDamage(laspistol, heavyTransport, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, lightTank, [])).to.equal(0.028);
        expect(roundedDamage(laspistol, heavyTank, [])).to.equal(0.014);
        expect(roundedDamage(laspistol, superHeavyWalker, []))
            .to.equal(0.028);

        expect(roundedDamage(boltPistol, lightInfantry, [])).to.equal(0.296);
        expect(roundedDamage(boltPistol, heavyInfantry, [])).to.equal(0.111);
        expect(roundedDamage(boltPistol, eliteInfantry, [])).to.equal(0.037);
        expect(roundedDamage(boltPistol, lightWalker, [])).to.equal(0.074);
        expect(roundedDamage(boltPistol, heavyWalker, [])).to.equal(0.019);
        expect(roundedDamage(boltPistol, lightTransport, [])).to.equal(0.056);
        expect(roundedDamage(boltPistol, heavyTransport, [])).to.equal(0.037);
        expect(roundedDamage(boltPistol, lightTank, [])).to.equal(0.037);
        expect(roundedDamage(boltPistol, heavyTank, [])).to.equal(0.019);
        expect(roundedDamage(boltPistol, superHeavyWalker, []))
            .to.equal(0.037);

        expect(roundedDamage(boltgun, lightInfantry, [])).to.equal(0.593);
        expect(roundedDamage(boltgun, heavyInfantry, [])).to.equal(0.222);
        expect(roundedDamage(boltgun, eliteInfantry, [])).to.equal(0.074);
        expect(roundedDamage(boltgun, lightWalker, [])).to.equal(0.148);
        expect(roundedDamage(boltgun, heavyWalker, [])).to.equal(0.037);
        expect(roundedDamage(boltgun, lightTransport, [])).to.equal(0.111);
        expect(roundedDamage(boltgun, heavyTransport, [])).to.equal(0.074);
        expect(roundedDamage(boltgun, lightTank, [])).to.equal(0.074);
        expect(roundedDamage(boltgun, heavyTank, [])).to.equal(0.037);
        expect(roundedDamage(boltgun, superHeavyWalker, [])).to.equal(0.074);

        expect(roundedDamage(plasmaPistol, lightInfantry, [])).to.equal(0.556);
        expect(roundedDamage(plasmaPistol, heavyInfantry, [])).to.equal(0.296);
        expect(roundedDamage(plasmaPistol, eliteInfantry, [])).to.equal(0.222);
        expect(roundedDamage(plasmaPistol, lightWalker, [])).to.equal(0.222);
        expect(roundedDamage(plasmaPistol, heavyWalker, [])).to.equal(0.111);
        expect(roundedDamage(plasmaPistol, lightTransport, [])).to.equal(0.185);
        expect(roundedDamage(plasmaPistol, heavyTransport, [])).to.equal(0.148);
        expect(roundedDamage(plasmaPistol, lightTank, [])).to.equal(0.148);
        expect(roundedDamage(plasmaPistol, heavyTank, [])).to.equal(0.111);
        expect(roundedDamage(plasmaPistol, superHeavyWalker, []))
            .to.equal(0.148);

        expect(roundedDamage(plasmaPistolSupercharge, lightInfantry, []))
            .to.equal(0.556);
        expect(roundedDamage(plasmaPistolSupercharge, heavyInfantry, []))
            .to.equal(0.296);
        expect(roundedDamage(plasmaPistolSupercharge, eliteInfantry, []))
            .to.equal(0.222);
        expect(roundedDamage(plasmaPistolSupercharge, lightWalker, []))
            .to.equal(0.222);
        expect(roundedDamage(plasmaPistolSupercharge, heavyWalker, []))
            .to.equal(0.111);
        expect(roundedDamage(plasmaPistolSupercharge, lightTransport, []))
            .to.equal(0.185);
        expect(roundedDamage(plasmaPistolSupercharge, heavyTransport, []))
            .to.equal(0.148);
        expect(roundedDamage(plasmaPistolSupercharge, lightTank, []))
            .to.equal(0.148);
        expect(roundedDamage(plasmaPistolSupercharge, heavyTank, []))
            .to.equal(0.111);
        expect(roundedDamage(plasmaPistolSupercharge, superHeavyWalker, []))
            .to.equal(0.148);
    });

    it('should return the correct damage for weapons againsts defenders with the benefit of cover', () => {
        const cover = benefitOfCoverModifier;
        expect(roundedDamage(laspistol, lightInfantry, [cover]))
            .to.equal(0.125); // vs 0.167 without cover
        expect(roundedDamage(laspistol, heavyInfantry, [cover]))
            .to.equal(0.056); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, eliteInfantry, [cover]))
            .to.equal(0.028); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(laspistol, lightWalker, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, heavyWalker, [cover]))
            .to.equal(0.014); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(laspistol, lightTransport, [cover]))
            .to.equal(0.028); // vs 0.042 without cover
        expect(roundedDamage(laspistol, heavyTransport, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, lightTank, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(laspistol, heavyTank, [cover]))
            .to.equal(0.014); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(laspistol, superHeavyWalker, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)

        expect(roundedDamage(plasmaPistol, lightInfantry, [cover]))
            .to.equal(0.37); // vs 0.556 without cover
        expect(roundedDamage(plasmaPistol, heavyInfantry, [cover]))
            .to.equal(0.222); // vs 0.296 without cover
        expect(roundedDamage(plasmaPistol, eliteInfantry, [cover]))
            .to.equal(0.148); // vs 0.222 without cover
        expect(roundedDamage(plasmaPistol, lightWalker, [cover]))
            .to.equal(0.167); // vs 0.222 without cover
        expect(roundedDamage(plasmaPistol, heavyWalker, [cover]))
            .to.equal(0.074); // vs 0.111 without cover
        expect(roundedDamage(plasmaPistol, lightTransport, [cover]))
            .to.equal(0.111); // vs 0.185 without cover
        expect(roundedDamage(plasmaPistol, heavyTransport, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
        expect(roundedDamage(plasmaPistol, lightTank, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
        expect(roundedDamage(plasmaPistol, heavyTank, [cover]))
            .to.equal(0.074); // vs 0.111 without cover
        expect(roundedDamage(plasmaPistol, superHeavyWalker, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
    });

    it('should return the correct damage for weapons with torrent', () => {
        expect(roundedDamage(flamer, lightInfantry, [])).to.equal(1.556);
        expect(roundedDamage(flamer, heavyInfantry, [])).to.equal(0.583);
        expect(roundedDamage(flamer, eliteInfantry, [])).to.equal(0.194);
        expect(roundedDamage(flamer, lightWalker, [])).to.equal(0.389);
        expect(roundedDamage(flamer, heavyWalker, [])).to.equal(0.097);
        expect(roundedDamage(flamer, lightTransport, [])).to.equal(0.292);
        expect(roundedDamage(flamer, heavyTransport, [])).to.equal(0.194);
        expect(roundedDamage(flamer, lightTank, [])).to.equal(0.194);
        expect(roundedDamage(flamer, heavyTank, [])).to.equal(0.097);
        expect(roundedDamage(flamer, superHeavyWalker, []))
            .to.equal(0.194);
    });

    it('should return the correct damage for weapons with heavy whose model did not move', () => {
        const heavy = heavyModifier;
        expect(roundedDamage(autocannon, lightInfantry, [heavy]))
            .to.equal(0.926);
        expect(roundedDamage(autocannon, heavyInfantry, [heavy]))
            .to.equal(1.389);
        expect(roundedDamage(autocannon, eliteInfantry, [heavy]))
            .to.equal(1.111);
        expect(roundedDamage(autocannon, lightWalker, [heavy]))
            .to.equal(1.667);
        expect(roundedDamage(autocannon, heavyWalker, [heavy]))
            .to.equal(0.833);
        expect(roundedDamage(autocannon, lightTransport, [heavy]))
            .to.equal(2.222);
        expect(roundedDamage(autocannon, heavyTransport, [heavy]))
            .to.equal(1.25);
        expect(roundedDamage(autocannon, lightTank, [heavy]))
            .to.equal(0.833);
        expect(roundedDamage(autocannon, heavyTank, [heavy]))
            .to.equal(0.556);
        expect(roundedDamage(autocannon, superHeavyWalker, [heavy]))
            .to.equal(0.833);
    });

    it('should return the correct damage for weapons with rapid fire in half range', () => {
        const rapidFire = rapidFireModifier;

        // Outside half range.
        expect(roundedDamage(lasgun, lightInfantry, []))
            .to.equal(0.167);

        // Within half range.
        expect(roundedDamage(lasgun, lightInfantry, [rapidFire]))
            .to.equal(0.333);
        expect(roundedDamage(lasgun, heavyInfantry, [rapidFire]))
            .to.equal(0.167);
        expect(roundedDamage(lasgun, eliteInfantry, [rapidFire]))
            .to.equal(0.111);
        expect(roundedDamage(lasgun, lightWalker, [rapidFire]))
            .to.equal(0.139);
        expect(roundedDamage(lasgun, heavyWalker, [rapidFire]))
            .to.equal(0.083);
        expect(roundedDamage(lasgun, lightTransport, [rapidFire]))
            .to.equal(0.292);
        expect(roundedDamage(lasgun, heavyTransport, [rapidFire]))
            .to.equal(0.222);
        expect(roundedDamage(lasgun, lightTank, [rapidFire]))
            .to.equal(0.25);
        expect(roundedDamage(lasgun, heavyTank, [rapidFire]))
            .to.equal(0.139);
        expect(roundedDamage(lasgun, superHeavyWalker, [rapidFire]))
            .to.equal(0.306);

        // Outside half range (rapid fire 2)
        expect(roundedDamage(combiBolter, lightInfantry, []))
            .to.equal(0.593);

        // Within half range (rapid fire 2)
        expect(roundedDamage(combiBolter, lightInfantry, [rapidFire]))
            .to.equal(1.185);
    });

    it('should return the correct damage for weapons with variable damage', () => {
        expect(roundedDamage(lascannon, lightInfantry, [])).to.equal(0.417);
        expect(roundedDamage(lascannon, heavyInfantry, [])).to.equal(0.694);
        expect(roundedDamage(lascannon, eliteInfantry, [])).to.equal(0.625);
        expect(roundedDamage(lascannon, lightWalker, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, heavyWalker, [])).to.equal(1);
        expect(roundedDamage(lascannon, lightTransport, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, heavyTransport, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, lightTank, [])).to.equal(1.25);
        expect(roundedDamage(lascannon, heavyTank, [])).to.equal(0.75);
        expect(roundedDamage(lascannon, superHeavyWalker, [])).to.equal(0.75);
    });
});

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
    lightPistol,
    heavyPistol,
    heavyRifle,
    elitePistol,
    elitePistolOvercharge,
    flamethrower,
    antiMaterialRifle,
    beamRifle,
} from '../../config/default-weapon-profiles.ts';

import {
    benefitOfCoverModifier,
    heavyModifier,
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
        expect(roundedDamage(elitePistol, eliteInfantry, [benefitOfCoverModifier]))
            .to.equal(0.111); // vs 0.167 without cover
    });

    it('should return the correct damage for weapons with no effective modifiers', () => {
        expect(roundedDamage(lightPistol, lightInfantry, [])).to.equal(0.167);
        expect(roundedDamage(lightPistol, heavyInfantry, [])).to.equal(0.056);
        expect(roundedDamage(lightPistol, eliteInfantry, [])).to.equal(0.028);
        expect(roundedDamage(lightPistol, lightWalker, [])).to.equal(0.028);
        expect(roundedDamage(lightPistol, heavyWalker, [])).to.equal(0.014);
        expect(roundedDamage(lightPistol, lightTransport, [])).to.equal(0.042);
        expect(roundedDamage(lightPistol, heavyTransport, [])).to.equal(0.028);
        expect(roundedDamage(lightPistol, lightTank, [])).to.equal(0.028);
        expect(roundedDamage(lightPistol, heavyTank, [])).to.equal(0.014);
        expect(roundedDamage(lightPistol, superHeavyWalker, []))
            .to.equal(0.028);

        expect(roundedDamage(heavyPistol, lightInfantry, [])).to.equal(0.296);
        expect(roundedDamage(heavyPistol, heavyInfantry, [])).to.equal(0.111);
        expect(roundedDamage(heavyPistol, eliteInfantry, [])).to.equal(0.037);
        expect(roundedDamage(heavyPistol, lightWalker, [])).to.equal(0.074);
        expect(roundedDamage(heavyPistol, heavyWalker, [])).to.equal(0.019);
        expect(roundedDamage(heavyPistol, lightTransport, [])).to.equal(0.056);
        expect(roundedDamage(heavyPistol, heavyTransport, [])).to.equal(0.037);
        expect(roundedDamage(heavyPistol, lightTank, [])).to.equal(0.037);
        expect(roundedDamage(heavyPistol, heavyTank, [])).to.equal(0.019);
        expect(roundedDamage(heavyPistol, superHeavyWalker, []))
            .to.equal(0.037);

        expect(roundedDamage(heavyRifle, lightInfantry, [])).to.equal(0.593);
        expect(roundedDamage(heavyRifle, heavyInfantry, [])).to.equal(0.222);
        expect(roundedDamage(heavyRifle, eliteInfantry, [])).to.equal(0.074);
        expect(roundedDamage(heavyRifle, lightWalker, [])).to.equal(0.148);
        expect(roundedDamage(heavyRifle, heavyWalker, [])).to.equal(0.037);
        expect(roundedDamage(heavyRifle, lightTransport, [])).to.equal(0.111);
        expect(roundedDamage(heavyRifle, heavyTransport, [])).to.equal(0.074);
        expect(roundedDamage(heavyRifle, lightTank, [])).to.equal(0.074);
        expect(roundedDamage(heavyRifle, heavyTank, [])).to.equal(0.037);
        expect(roundedDamage(heavyRifle, superHeavyWalker, [])).to.equal(0.074);

        expect(roundedDamage(elitePistol, lightInfantry, [])).to.equal(0.556);
        expect(roundedDamage(elitePistol, heavyInfantry, [])).to.equal(0.296);
        expect(roundedDamage(elitePistol, eliteInfantry, [])).to.equal(0.222);
        expect(roundedDamage(elitePistol, lightWalker, [])).to.equal(0.222);
        expect(roundedDamage(elitePistol, heavyWalker, [])).to.equal(0.111);
        expect(roundedDamage(elitePistol, lightTransport, [])).to.equal(0.185);
        expect(roundedDamage(elitePistol, heavyTransport, [])).to.equal(0.148);
        expect(roundedDamage(elitePistol, lightTank, [])).to.equal(0.148);
        expect(roundedDamage(elitePistol, heavyTank, [])).to.equal(0.111);
        expect(roundedDamage(elitePistol, superHeavyWalker, []))
            .to.equal(0.148);

        expect(roundedDamage(elitePistolOvercharge, lightInfantry, []))
            .to.equal(0.556);
        expect(roundedDamage(elitePistolOvercharge, heavyInfantry, []))
            .to.equal(0.296);
        expect(roundedDamage(elitePistolOvercharge, eliteInfantry, []))
            .to.equal(0.222);
        expect(roundedDamage(elitePistolOvercharge, lightWalker, []))
            .to.equal(0.222);
        expect(roundedDamage(elitePistolOvercharge, heavyWalker, []))
            .to.equal(0.111);
        expect(roundedDamage(elitePistolOvercharge, lightTransport, []))
            .to.equal(0.185);
        expect(roundedDamage(elitePistolOvercharge, heavyTransport, []))
            .to.equal(0.148);
        expect(roundedDamage(elitePistolOvercharge, lightTank, []))
            .to.equal(0.148);
        expect(roundedDamage(elitePistolOvercharge, heavyTank, []))
            .to.equal(0.111);
        expect(roundedDamage(elitePistolOvercharge, superHeavyWalker, []))
            .to.equal(0.148);
    });

    it('should return the correct damage for weapons againsts defenders with the benefit of cover', () => {
        const cover = benefitOfCoverModifier;
        expect(roundedDamage(lightPistol, lightInfantry, [cover]))
            .to.equal(0.125); // vs 0.167 without cover
        expect(roundedDamage(lightPistol, heavyInfantry, [cover]))
            .to.equal(0.056); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(lightPistol, eliteInfantry, [cover]))
            .to.equal(0.028); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(lightPistol, lightWalker, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(lightPistol, heavyWalker, [cover]))
            .to.equal(0.014); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(lightPistol, lightTransport, [cover]))
            .to.equal(0.028); // vs 0.042 without cover
        expect(roundedDamage(lightPistol, heavyTransport, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(lightPistol, lightTank, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)
        expect(roundedDamage(lightPistol, heavyTank, [cover]))
            .to.equal(0.014); // AP 0 vs 2+ (no modifier effect)
        expect(roundedDamage(lightPistol, superHeavyWalker, [cover]))
            .to.equal(0.028); // AP 0 vs 3+ (no modifier effect)

        expect(roundedDamage(elitePistol, lightInfantry, [cover]))
            .to.equal(0.37); // vs 0.556 without cover
        expect(roundedDamage(elitePistol, heavyInfantry, [cover]))
            .to.equal(0.222); // vs 0.296 without cover
        expect(roundedDamage(elitePistol, eliteInfantry, [cover]))
            .to.equal(0.148); // vs 0.222 without cover
        expect(roundedDamage(elitePistol, lightWalker, [cover]))
            .to.equal(0.167); // vs 0.222 without cover
        expect(roundedDamage(elitePistol, heavyWalker, [cover]))
            .to.equal(0.074); // vs 0.111 without cover
        expect(roundedDamage(elitePistol, lightTransport, [cover]))
            .to.equal(0.111); // vs 0.185 without cover
        expect(roundedDamage(elitePistol, heavyTransport, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
        expect(roundedDamage(elitePistol, lightTank, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
        expect(roundedDamage(elitePistol, heavyTank, [cover]))
            .to.equal(0.074); // vs 0.111 without cover
        expect(roundedDamage(elitePistol, superHeavyWalker, [cover]))
            .to.equal(0.111); // vs 0.148 without cover
    });

    it('should return the correct damage for weapons with torrent', () => {
        expect(roundedDamage(flamethrower, lightInfantry, [])).to.equal(1.556);
        expect(roundedDamage(flamethrower, heavyInfantry, [])).to.equal(0.583);
        expect(roundedDamage(flamethrower, eliteInfantry, [])).to.equal(0.194);
        expect(roundedDamage(flamethrower, lightWalker, [])).to.equal(0.389);
        expect(roundedDamage(flamethrower, heavyWalker, [])).to.equal(0.097);
        expect(roundedDamage(flamethrower, lightTransport, [])).to.equal(0.292);
        expect(roundedDamage(flamethrower, heavyTransport, [])).to.equal(0.194);
        expect(roundedDamage(flamethrower, lightTank, [])).to.equal(0.194);
        expect(roundedDamage(flamethrower, heavyTank, [])).to.equal(0.097);
        expect(roundedDamage(flamethrower, superHeavyWalker, []))
            .to.equal(0.194);
    });

    it('should return the correct damage for weapons with heavy whose model did not move', () => {
        const heavy = heavyModifier;
        expect(roundedDamage(antiMaterialRifle, lightInfantry, [heavy]))
            .to.equal(0.926);
        expect(roundedDamage(antiMaterialRifle, heavyInfantry, [heavy]))
            .to.equal(1.389);
        expect(roundedDamage(antiMaterialRifle, eliteInfantry, [heavy]))
            .to.equal(1.111);
        expect(roundedDamage(antiMaterialRifle, lightWalker, [heavy]))
            .to.equal(1.667);
        expect(roundedDamage(antiMaterialRifle, heavyWalker, [heavy]))
            .to.equal(0.833);
        expect(roundedDamage(antiMaterialRifle, lightTransport, [heavy]))
            .to.equal(2.222);
        expect(roundedDamage(antiMaterialRifle, heavyTransport, [heavy]))
            .to.equal(1.25);
        expect(roundedDamage(antiMaterialRifle, lightTank, [heavy]))
            .to.equal(0.833);
        expect(roundedDamage(antiMaterialRifle, heavyTank, [heavy]))
            .to.equal(0.556);
        expect(roundedDamage(antiMaterialRifle, superHeavyWalker, [heavy]))
            .to.equal(0.833);
    });

    it('should return the correct damage for weapons with variable damage', () => {
        expect(roundedDamage(beamRifle, lightInfantry, [])).to.equal(0.417);
        expect(roundedDamage(beamRifle, heavyInfantry, [])).to.equal(0.694);
        expect(roundedDamage(beamRifle, eliteInfantry, [])).to.equal(0.625);
        expect(roundedDamage(beamRifle, lightWalker, [])).to.equal(1.25);
        expect(roundedDamage(beamRifle, heavyWalker, [])).to.equal(1);
        expect(roundedDamage(beamRifle, lightTransport, [])).to.equal(1.25);
        expect(roundedDamage(beamRifle, heavyTransport, [])).to.equal(1.25);
        expect(roundedDamage(beamRifle, lightTank, [])).to.equal(1.25);
        expect(roundedDamage(beamRifle, heavyTank, [])).to.equal(0.75);
        expect(roundedDamage(beamRifle, superHeavyWalker, [])).to.equal(0.75);
    });
});

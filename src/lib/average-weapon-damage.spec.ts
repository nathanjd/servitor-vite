import { describe, expect, it } from 'vitest';

import {
    averageWeaponDamage,
    ModelProfile,
    WeaponProfile,
} from './average-weapon-damage.ts';

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
} from '../config/default-model-profiles.ts';

import {
    lightPistol,
    heavyPistol,
    heavyRifle,
    elitePistol,
    elitePistolOvercharge,
    flamethrower,
    antiMaterialRifle,
    beamRifle,
} from '../config//default-weapon-profiles.ts';

describe('averageWeaponDamage(weapons, targetModel)', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedDamage = (weapons: WeaponProfile[], model: ModelProfile) =>
        round(averageWeaponDamage(weapons, model));

    it('should true', () => {
        expect(true).toEqual(true);
    });

    it('should return 0 damage for no weapons', () => {
        expect(roundedDamage([], lightInfantry)).to.equal(0);
    });

    it('should return the correct damage for weapons with no effective modifiers', () => {
        expect(roundedDamage([lightPistol], lightInfantry)).to.equal(0.111);
        expect(roundedDamage([heavyPistol], lightInfantry)).to.equal(0.222);
        expect(roundedDamage([heavyRifle], lightInfantry)).to.equal(0.444);
        expect(roundedDamage([elitePistol], lightInfantry)).to.equal(0.417);
        expect(roundedDamage([elitePistolOvercharge], lightInfantry))
            .to.equal(0.417);

        expect(roundedDamage([lightPistol], heavyInfantry)).to.equal(0.037);
        expect(roundedDamage([heavyPistol], heavyInfantry)).to.equal(0.083);
        expect(roundedDamage([heavyRifle], heavyInfantry)).to.equal(0.167);
        expect(roundedDamage([elitePistol], heavyInfantry)).to.equal(0.222);
        expect(roundedDamage([elitePistolOvercharge], heavyInfantry))
            .to.equal(0.222);

        expect(roundedDamage([lightPistol], eliteInfantry)).to.equal(0.019);
        expect(roundedDamage([heavyPistol], eliteInfantry)).to.equal(0.028);
        expect(roundedDamage([heavyRifle], eliteInfantry)).to.equal(0.056);
        expect(roundedDamage([elitePistol], eliteInfantry)).to.equal(0.167);
        expect(roundedDamage([elitePistolOvercharge], eliteInfantry))
            .to.equal(0.167);

        expect(roundedDamage([lightPistol], lightWalker)).to.equal(0.019);
        expect(roundedDamage([heavyPistol], lightWalker)).to.equal(0.056);
        expect(roundedDamage([heavyRifle], lightWalker)).to.equal(0.111);
        expect(roundedDamage([elitePistol], lightWalker)).to.equal(0.167);
        expect(roundedDamage([elitePistolOvercharge], lightWalker))
            .to.equal(0.167);

        expect(roundedDamage([lightPistol], heavyWalker)).to.equal(0.009);
        expect(roundedDamage([heavyPistol], heavyWalker)).to.equal(0.014);
        expect(roundedDamage([heavyRifle], heavyWalker)).to.equal(0.028);
        expect(roundedDamage([elitePistol], heavyWalker)).to.equal(0.083);
        expect(roundedDamage([elitePistolOvercharge], heavyWalker))
            .to.equal(0.083);


        expect(roundedDamage([lightPistol], lightTransport)).to.equal(0.028);
        expect(roundedDamage([heavyPistol], lightTransport)).to.equal(0.083);
        expect(roundedDamage([heavyRifle], lightTransport)).to.equal(0.167);
        expect(roundedDamage([elitePistol], lightTransport)).to.equal(0.139);
        expect(roundedDamage([elitePistolOvercharge], lightTransport))
            .to.equal(0.139);

        expect(roundedDamage([lightPistol], heavyTransport)).to.equal(0.019);
        expect(roundedDamage([heavyPistol], heavyTransport)).to.equal(0.028);
        expect(roundedDamage([heavyRifle], heavyTransport)).to.equal(0.056);
        expect(roundedDamage([elitePistol], heavyTransport)).to.equal(0.111);
        expect(roundedDamage([elitePistolOvercharge], heavyTransport))
            .to.equal(0.111);

        expect(roundedDamage([lightPistol], lightTank)).to.equal(0.019);
        expect(roundedDamage([heavyPistol], lightTank)).to.equal(0.028);
        expect(roundedDamage([heavyRifle], lightTank)).to.equal(0.056);
        expect(roundedDamage([elitePistol], lightTank)).to.equal(0.111);
        expect(roundedDamage([elitePistolOvercharge], lightTank))
            .to.equal(0.111);

        expect(roundedDamage([lightPistol], heavyTank)).to.equal(0.009);
        expect(roundedDamage([heavyPistol], heavyTank)).to.equal(0.014);
        expect(roundedDamage([heavyRifle], heavyTank)).to.equal(0.028);
        expect(roundedDamage([elitePistol], heavyTank)).to.equal(0.083);
        expect(roundedDamage([elitePistolOvercharge], heavyTank))
            .to.equal(0.083);

        expect(roundedDamage([lightPistol], superHeavyWalker)).to.equal(0.019);
        expect(roundedDamage([heavyPistol], superHeavyWalker)).to.equal(0.028);
        expect(roundedDamage([heavyRifle], superHeavyWalker)).to.equal(0.056);
        expect(roundedDamage([elitePistol], superHeavyWalker)).to.equal(0.111);
        expect(roundedDamage([elitePistolOvercharge], superHeavyWalker))
            .to.equal(0.111);
    });

    it('should return the correct damage for weapons with torrent', () => {
        expect(roundedDamage([flamethrower], lightInfantry)).to.equal(1.556);
        expect(roundedDamage([flamethrower], heavyInfantry)).to.equal(0.583);
        expect(roundedDamage([flamethrower], eliteInfantry)).to.equal(0.194);
        expect(roundedDamage([flamethrower], lightWalker)).to.equal(0.389);
        expect(roundedDamage([flamethrower], heavyWalker)).to.equal(0.097);
        expect(roundedDamage([flamethrower], lightTransport)).to.equal(0.583);
        expect(roundedDamage([flamethrower], heavyTransport)).to.equal(0.194);
        expect(roundedDamage([flamethrower], lightTank)).to.equal(0.194);
        expect(roundedDamage([flamethrower], heavyTank)).to.equal(0.097);
        expect(roundedDamage([flamethrower], superHeavyWalker)).to.equal(0.194);
    });

    it('should return the correct damage for weapons with heavy', () => {
        expect(roundedDamage([antiMaterialRifle], lightInfantry))
            .to.equal(0.694);
        expect(roundedDamage([antiMaterialRifle], heavyInfantry))
            .to.equal(0.833);
        expect(roundedDamage([antiMaterialRifle], eliteInfantry))
            .to.equal(0.667);
        expect(roundedDamage([antiMaterialRifle], lightWalker)).to.equal(1);
        expect(roundedDamage([antiMaterialRifle], heavyWalker)).to.equal(0.5);
        expect(roundedDamage([antiMaterialRifle], lightTransport))
            .to.equal(1.333);
        expect(roundedDamage([antiMaterialRifle], heavyTransport))
            .to.equal(0.75);
        expect(roundedDamage([antiMaterialRifle], lightTank)).to.equal(0.5);
        expect(roundedDamage([antiMaterialRifle], heavyTank)).to.equal(0.333);
        expect(roundedDamage([antiMaterialRifle], superHeavyWalker))
            .to.equal(0.5);

        expect(roundedDamage([beamRifle], lightInfantry)).to.equal(0.417);
        expect(roundedDamage([beamRifle], heavyInfantry)).to.equal(0.694);
        expect(roundedDamage([beamRifle], eliteInfantry)).to.equal(0.625);
        expect(roundedDamage([beamRifle], lightWalker)).to.equal(1.25);
        expect(roundedDamage([beamRifle], heavyWalker)).to.equal(1);
        expect(roundedDamage([beamRifle], lightTransport)).to.equal(1.25);
        expect(roundedDamage([beamRifle], heavyTransport)).to.equal(1.25);
        expect(roundedDamage([beamRifle], lightTank)).to.equal(1.25);
        expect(roundedDamage([beamRifle], heavyTank)).to.equal(0.75);
        expect(roundedDamage([beamRifle], superHeavyWalker)).to.equal(0.75);
    });
});

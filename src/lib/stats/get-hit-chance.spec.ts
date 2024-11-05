import { describe, expect, it } from 'vitest';

import { getHitChance } from './mean-weapon-roll';

describe('getHitChance(weapons, targetModel)', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedHitChance = (hitSkill: number) =>
        round(getHitChance(hitSkill));

    it('should return the chance of passing a hit roll on a d6', () => {
        // A roll of 1 always fails so a hit skill better than 2+ has no effect.
        expect(roundedHitChance(0)).to.equal(0.833);
        expect(roundedHitChance(1)).to.equal(0.833);

        expect(roundedHitChance(2)).to.equal(0.833);
        expect(roundedHitChance(3)).to.equal(0.667);
        expect(roundedHitChance(4)).to.equal(0.5);
        expect(roundedHitChance(5)).to.equal(0.333);
        expect(roundedHitChance(6)).to.equal(0.167);

        // A roll of 6 always succeeds so a hit skill worse than 6+ has no
        // effect.
        expect(roundedHitChance(7)).to.equal(0.167);
        expect(roundedHitChance(8)).to.equal(0.167);

        // A hit skill of negative Infinity will be considered an automatic hit.
        // For example, weapons with the torrent keyword.
        expect(roundedHitChance(-Infinity)).to.equal(1);
    });
});

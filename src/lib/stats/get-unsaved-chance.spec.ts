import { describe, expect, it } from 'vitest';

import { getUnsavedChance } from './mean-weapon-roll';

describe('getUnsavedChance(weapons, targetModel)', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedUnsavedChance = (hitSkill: number) =>
        round(getUnsavedChance(hitSkill));

    it('should return the chance of failing an armor save on a d6', () => {
        // A roll of 1 always fails so a hit skill better than 2+ has no effect.
        expect(roundedUnsavedChance(0)).to.equal(0.167);
        expect(roundedUnsavedChance(1)).to.equal(0.167);

        expect(roundedUnsavedChance(2)).to.equal(0.167);
        expect(roundedUnsavedChance(3)).to.equal(0.333);
        expect(roundedUnsavedChance(4)).to.equal(0.5);
        expect(roundedUnsavedChance(5)).to.equal(0.667);
        expect(roundedUnsavedChance(6)).to.equal(0.833);

        // Models with no save (worse than a 6+) always fail.
        expect(roundedUnsavedChance(7)).to.equal(1);
        expect(roundedUnsavedChance(8)).to.equal(1);

        // An armor save of Infinity will be considered an automatic unsaved
        // wound. For example, a critical hit from a weapon with devastating
        // wounds.
        expect(roundedUnsavedChance(Infinity)).to.equal(1);
    });
});

import { describe, expect, it } from 'vitest';

import { getWoundChance } from './mean-weapon-roll';

describe('getWoundChance(weapons, targetModel)', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedUnsavedChance = (strength: number, toughness: number) =>
        round(getWoundChance(strength, toughness));

    it('should return the chance of failing an armor save on a d6', () => {
        // Double strength wounds on a 2+.
        expect(roundedUnsavedChance(14, 6)).to.equal(0.833);
        expect(roundedUnsavedChance(12, 6)).to.equal(0.833);

        // Greater strength (but not double) wounds on a 3+.
        expect(roundedUnsavedChance(11, 6)).to.equal(0.667);
        expect(roundedUnsavedChance(7, 6)).to.equal(0.667);

        // Equal strength wounds on a 4+.
        expect(roundedUnsavedChance(6, 6)).to.equal(0.5);

        // Lesser strength (but not half) wounds on a 5+.
        expect(roundedUnsavedChance(5, 6)).to.equal(0.333);
        expect(roundedUnsavedChance(4, 6)).to.equal(0.333);

        // Half strength wounds on a 6+.
        expect(roundedUnsavedChance(3, 6)).to.equal(0.167);
        expect(roundedUnsavedChance(2, 6)).to.equal(0.167);

        // A strength of Infinity will always wound.
        expect(roundedUnsavedChance(Infinity, 6)).to.equal(1);
    });
});

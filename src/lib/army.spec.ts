import { describe, expect, it } from 'vitest';

import { sumArmyPoints } from './army.ts';

import { defaultArmy } from '../config/mock-armies.ts';

describe('sumArmyPoints(army)', () => {
    it("should return the sum of all units' points",  () => {
        const total = sumArmyPoints(defaultArmy);
        expect(total).to.equal(defaultArmy.points);
    });
});

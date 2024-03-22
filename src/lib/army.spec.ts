import { describe, expect, it } from 'vitest';

import { sumUnitsPoints } from './army.ts';

import { defaultArmy } from '../config/mock-armies.ts';

describe('sumArmyPoints(army)', () => {
    it('should return the sum of all units\' points',  () => {
        const total = sumUnitsPoints(defaultArmy.units);
        expect(total).to.equal(defaultArmy.points);
    });
});

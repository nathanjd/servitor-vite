import { describe, expect, it } from 'vitest';

import { averageForDiceExpression } from './average-for-dice-expression.ts';

describe('averageWeaponDamage(expression: string): number', () => {
    const round = (num: number): number => Math.round(num * 1000) / 1000;
    const roundedAverage = (expression:  string) =>
        round(averageForDiceExpression(expression));

    it('should return non-variable damage', () => {
        expect(roundedAverage('2')).to.equal(2);
    });

    it('should return damage for a single die', () => {
        expect(roundedAverage('d6')).to.equal(3.5);
        expect(roundedAverage('d8')).to.equal(4.5);
        expect(roundedAverage('d10')).to.equal(5.5);
        expect(roundedAverage('d12')).to.equal(6.5);
        expect(roundedAverage('d20')).to.equal(10.5);
    });

    it('should return damage for multiple die', () => {
        expect(roundedAverage('2d6')).to.equal(7);
        expect(roundedAverage('2d8')).to.equal(9);
        expect(roundedAverage('2d10')).to.equal(11);
        expect(roundedAverage('2d12')).to.equal(13);
        expect(roundedAverage('2d20')).to.equal(21);
    });

    it('should return damage for multiple die with modifiers', () => {
        expect(roundedAverage('2d6+1')).to.equal(8);
        expect(roundedAverage('2d8+2')).to.equal(11);
        expect(roundedAverage('2d10+3')).to.equal(14);
        expect(roundedAverage('2d12+4')).to.equal(17);
        expect(roundedAverage('2d20+5')).to.equal(26);
    });
});

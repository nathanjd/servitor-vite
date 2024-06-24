import { describe, expect, it } from 'vitest';

import { parseCountFromName } from './parse-count-from-name.ts';

describe('parseCountFromName(name)', () => {
    it('should return the first number', () => {
        // Act & Assert
        expect(parseCountFromName('5 Terminators')).toEqual(5);
        expect(parseCountFromName('1 Predator')).toEqual(1);
    });

    it('should return 1 when no leading number is present', () => {
        // Act & Assert
        expect(parseCountFromName('Vindicator')).toEqual(1);
    });
});

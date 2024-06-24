import { describe, expect, it } from 'vitest';

import { removeCountFromName } from './remove-count-from-name.ts';

describe('removeCountFromName(name, depluralize)', () => {
    it('should not depluralize when requested', () => {
        // Act & Assert
        expect(removeCountFromName('5 Terminators', false))
            .toEqual('Terminators');
    });

    it('should depluralize when count is 1', () => {
        // Act & Assert
        expect(removeCountFromName('5 Terminators', true))
            .toEqual('Terminator');
    });

    it('should not depluralize when count is greater than 1', () => {
        // Act & Assert
        expect(removeCountFromName('5 Terminators', true))
            .toEqual('Terminators');
    });

    it('should depluralize exceptions', () => {
        // Act & Assert
        expect(removeCountFromName('5 Legionaries', true))
            .toEqual('Legionary');
    });
});

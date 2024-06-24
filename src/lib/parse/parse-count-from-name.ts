import { isTextInteger } from './is-text-integer';

/**
 * If the first word in the name is a number, assume it is the number of
 * models in a unit. Otherwise, assume the number of models 1.
 */
export const parseCountFromName = (name: string): number => {
    const firstWord = name.split(' ')[0];

    if (!isTextInteger(firstWord)) {
        return 1;
    }

    return parseInt(firstWord, 10);
};

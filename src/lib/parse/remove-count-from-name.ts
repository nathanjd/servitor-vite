import { isTextInteger } from './is-text-integer';

type DepluralizationMap = {
    [key: string]: string;
};

// For units, keeping the 's' is the normal case and removing it is the
// exception. Depluralization only needs to happen on units that have a size of
// 1-N which is typically only for units like vehicle and monster squadrons. For
// wargear, it's almost alwats correct to depluralize,
const depluralizationExceptions: DepluralizationMap = {
    Legionaries: 'Legionary',
};

/**
 * If the first word in the name is a number, remove it and optionally
 * depluralize it.
 */
export const removeCountFromName = (name: string, depluralize: boolean): string => {
    const words  = name.split(' ') || [];
    const firstWord = words[0];

    // First word is not a number so there is no count to remove.
    if (!isTextInteger(firstWord)) {
        return name;
    }

    // Remove first word as it's the count.
    words.shift();
    const nameWithountCount = words.join(' ');

    // Depluralize if requested and count is more than 1.
    if (depluralize && nameWithountCount.length > 1) {
        if (depluralizationExceptions[nameWithountCount]) {
            return depluralizationExceptions[nameWithountCount];
        }

        // If name ends in 's', remove the 's'.
        if (nameWithountCount[nameWithountCount.length - 1] === 's') {
            return nameWithountCount.substring(0, nameWithountCount.length - 1);
        }

        // Leave name as-is.
    }

    return nameWithountCount;
};

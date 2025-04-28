import { HitContext } from '../lib/stats/context/attack-context';

/**
 * Causes an automatic wound on a critical hit.
 */
export const lethalHitsModifier = (
    context: HitContext,
): HitContext => {
    if (context.attackContext.weapon.keywords.includes('lethal hits')) {
        // This is wrong.
        // TODO: Make lethal apply only to the individual attack, not every
        // attack with the weapon.
        context.attackContext.weapon.strength = Infinity;
    }

    return context;
};

/**
 * Add bonus hit(s) on critical hits. Should only be called after a critical hit
 * has been rolled.
 */
export const sustainedHitsModifier = (
    hitContext: HitContext,
): HitContext => {
    let numberOfExtraHits = 1;
    const found = hitContext.attackContext.weapon.keywords
        .find(keyword => {
            const searchResult = /^sustained hits ?(\d+)/.exec(keyword);
            if (searchResult === null) {
                return false;
            }

            const stringHits = searchResult[1];
            const numberHits = parseInt(stringHits, 10);
            if (!isNaN(numberHits)) {
                numberOfExtraHits = numberHits;
            }
            return true;
        });

    if (found) {
        hitContext.meanHits += numberOfExtraHits * hitContext.meanCriticalHits;
    }

    return hitContext;
};

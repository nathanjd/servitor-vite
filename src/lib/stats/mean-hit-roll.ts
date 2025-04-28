import { getHitChance } from '../profiles/weapon-profile';
import { AttackContext, cloneHitContext, getHitContext } from './context/attack-context';

export interface HitRollResult {
    meanHits          : number;
    hitContext        : AttackContext;
    meanCriticalHits  : number;
    criticalHitContext: AttackContext;
}

/**
 * Returns the result of a single hit roll. Includes mean hits, mean critical
 * hits, and their respective contexts.
 */
export const meanHitRoll = (context: AttackContext): HitRollResult => {
    const hitContext = getHitContext(context);
    const { weapon } = hitContext.attackContext;
    const {
        criticalHitSkill,
        hitSkill,
    } = weapon;
    const isTorrent = weapon.keywords.includes('torrent');
    const hitChance = isTorrent ? 1 : getHitChance(hitSkill);
    const criticalHitChance = isTorrent ?
        0 : getHitChance(criticalHitSkill || 6);
    const noncriticalHitChance = Math.max(0, hitChance - criticalHitChance);

    hitContext.meanHits = 1 * noncriticalHitChance;
    hitContext.meanCriticalHits = 1 * criticalHitChance;

    // critical hit
    const criticalHitContext = context.criticalHitModifiers.reduce(
        (modifiedContext, modifier) => modifier(modifiedContext, hitContext),

        // Clone context so that mutations don't affect the original context.
        // Critical hits are both hits and critical hits.
        cloneHitContext(hitContext),
    );

    return {
        // Take mean hits from criticalHitContext because it was computed later
        // and may have added additional hits. Ex: Sustained Hits
        meanHits          : criticalHitContext.meanHits,
        hitContext        : hitContext.attackContext,
        meanCriticalHits  : criticalHitContext.meanCriticalHits,
        criticalHitContext: criticalHitContext.attackContext,
    };
};

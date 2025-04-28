import { ModelProfile } from '../../profiles/model-profile';
import { WeaponProfile } from '../../profiles/weapon-profile';

// Called when computing an attack roll's effective stats (such as strength or
// armor save). Takes the attacking weapon, defending model and the current
// modified context before running this modifier to return the modified conext.
// Base stats can be looked up in originalContext. Never modify originalContext!
export interface AttackModifierFunction {
    (
        currentContext: AttackContext,
        originalContext: AttackContext,
    ): AttackContext;
}

export interface HitModifierFunction {
    (
        currentContext: HitContext,
        originalContext: HitContext,
    ): HitContext;
}

// All the context needed to compute a mean weapon roll.
export interface AttackContext {
    weapon                : WeaponProfile;
    targetModel           : ModelProfile;
    modifiers             : AttackModifierFunction[];
    criticalHitModifiers  : HitModifierFunction[];
    criticalWoundModifiers: AttackModifierFunction[];
}

export interface HitContext {
    attackContext   : AttackContext;
    meanHits        : number;
    meanCriticalHits: number;
}

export interface CriticalHitContext {
    attackContext   : AttackContext;
    meanCriticalHits: number;
}

export const cloneContext = (context: AttackContext): AttackContext => ({
    // This clone assumes weapon has no nested properties.
    weapon: Object.assign(context.weapon),

    // This clone assumes targetModel has no nested properties.
    targetModel: Object.assign(context.targetModel),

    // No reason to clone modifiers as these should not be mutated.
    modifiers             : context.modifiers,
    criticalHitModifiers  : context.criticalHitModifiers,
    criticalWoundModifiers: context.criticalWoundModifiers,
});

export const cloneHitContext = (hitContext: HitContext): HitContext => ({
    attackContext: cloneContext(hitContext.attackContext),

    // No need to clone primitives.
    meanHits        : hitContext.meanHits,
    meanCriticalHits: hitContext.meanCriticalHits,
});

export const getHitContext = (attackContext: AttackContext): HitContext => {
    return {
        // Clone context so that mutations don't affect the original context.
        attackContext: attackContext.modifiers.reduce(
            (modifiedContext, modifier) =>
                modifier(modifiedContext, attackContext),

            // Clone context so that mutations don't affect the original
            // context.
            cloneContext(attackContext),
        ),
        meanHits        : 0,
        meanCriticalHits: 0,
    };
};

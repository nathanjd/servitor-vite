import { AttackContext } from '../lib/stats/context/attack-context';

/**
 * Improves defender's armor save by 1 given it has the benefit of cover.
 */
export const benefitOfCoverModifier = (
    currentContext: AttackContext,
    originalContext: AttackContext,
): AttackContext => {
    // Models with a Save characteristic of 3+ or better cannot have the Benefit
    // of Cover against attacks with an Armour Penetration characteristic of 0.
    // pg 44
    if (
        originalContext.weapon.armorPenetration === 0 &&
        originalContext.targetModel.armorSave <= 3
    ) {
        return currentContext;
    }

    const { armorSave } = currentContext.targetModel;

    // Each time a ranged attack is allocated to a model that has the Benefit of
    // Cover, add 1 to the saving throw made for that attack (excluding
    // invulnerable saving throws). pg 44
    currentContext.targetModel.armorSave = armorSave - 1;

    return currentContext;
};

/**
 * Improves hit skill of weapons with the heavy keyword by 1 given the model
 * bearing them has not moved.
 */
export const heavyModifier = (
    currentContext: AttackContext,
): AttackContext => {
    if (currentContext.weapon.keywords.includes('heavy')) {
        const { hitSkill } = currentContext.weapon;
        currentContext.weapon.hitSkill = hitSkill - 1;
    }

    return currentContext;
};

/**
 * Adds bonus attack(s) given attacking model is within half range of defending
 * model.
 */
export const rapidFireModifier = (
    currentContext: AttackContext,
): AttackContext => {
    let numberOfExtraAttacks = 1;
    const found = currentContext.weapon.keywords.find(keyword => {
        const searchResult = /^rapid fire ?(\d+)/.exec(keyword);
        if (searchResult === null) {
            return false;
        }

        const stringAttacks = searchResult[1];
        const numberAttacks = parseInt(stringAttacks, 10);
        if (!isNaN(numberAttacks)) {
            numberOfExtraAttacks = numberAttacks;
        }
        return true;
    });

    if (found) {
        const attacks = parseInt(currentContext.weapon.attacks, 10);
        currentContext.weapon.attacks = `${attacks + numberOfExtraAttacks}`;
    }

    return currentContext;
};

// export const marksOfChaos  = (
//     currentContext: AttackContext,
// ): AttackContext => {
//     if hitRoll
// }

/**
 *
 */
export const averageForDiceExpression = (expression: string): number => {
    // If present, number before 'd' is the number of dice to roll.
    const result = expression.split('d');

    // No 'd' is present so damage is not variable.
    if (result.length === 1) {
        return parseInt(expression, 10);
    }

    const diceCount = result[0].length == 0 ? 1 : parseInt(result[0], 10);
    const diceFaces = parseInt(expression.split('d')[1].split('+')[0], 10);
    const modifierParts = expression.split('+');

    let sum = 0;
    for (let i = 0; i < diceFaces; i++) {
        sum = sum + i + 1;
    }
    const perDieAverage = sum / diceFaces;

    const modifier =
        modifierParts.length === 1  ? 0 : parseInt(modifierParts[1], 10);

    const totalAverage = perDieAverage * diceCount + modifier;
    return totalAverage;
};

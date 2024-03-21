export const sumArmyPoints = ({units}) =>
    units.reduce((totalPoints, unit) => {
        return totalPoints + parseInt(unit.points, 10);
    }, 0);

export const armyToBBCode = (army) => {
    let str = '';

    this.units.forEach((unit) => {
        str += '[b]' + unit.name + '[/b]';

        if (unit.wargear && unit.wargear.length) {
            str += ': ' + unit.wargear.join(', ');
        }

        str += ' - ' + unit.points + '\n';
    });

    return str;
}

export const armyToString = (army) => {
    let str = '';

    army.units.forEach((unit) => {
        str += unit.name;

        if (unit.wargear && unit.wargear.length) {
            str += ': ' + unit.wargear.join(', ');
        }

        str += ' - ' + unit.points + '\n';
    });

    return str;
}

import { Army, Unit } from './parse-army-text';

export const sumUnitsPoints = (units: Unit[]): number =>
    units.reduce((totalPoints, unit) => {
        return totalPoints + unit.points;
    }, 0);

export const armyToBBCode = (army: Army): string => {
    let str = '';

    army.units.forEach((unit) => {
        str += '[b]' + unit.name + '[/b]';

        const wargear = unit.models.reduce<string[]>((gear, model) => {
            if (model.wargear.length) {
                gear.push(...model.wargear);
            }
            return gear;
        }, []);

        if (wargear.length) {
            str += ': ' + wargear.join(', ');
        }

        str += ' - ' + unit.points + '\n';
    });

    return str;
};

export const armyToString = (army: Army): string => {
    let str = '';

    army.units.forEach((unit) => {
        str += unit.name;

        const wargear = unit.models.reduce<string[]>((gear, model) => {
            if (model.wargear.length) {
                gear.push(...model.wargear);
            }
            return gear;
        }, []);

        if (wargear.length) {
            str += ': ' + wargear.join(', ');
        }

        str += ' - ' + unit.points + '\n';
    });

    return str;
};

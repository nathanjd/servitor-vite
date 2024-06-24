import { sumUnitsPoints } from '../army.ts';
import { parseCountFromName } from './parse-count-from-name.ts';
import { removeCountFromName } from './remove-count-from-name.ts';
import { distributeWargearToModels } from './distribute-wargear-to-models.ts';

export interface Model {
    wargear: string[];
}

export interface Unit {
    models: Model[];
    name  : string;
    points: number;
    text  : string;
}

export interface Army {
    id       : string;
    name     : string;
    parseLog?: string[];
    points   : number;
    text     : string;
    units    : Unit[];
}

enum ParseState {
    InComment = 'IN_COMMENT',
    Initial = 'INITIAL',
    InPoints = 'IN_POINTS',
    InWargear = 'IN_WARGEAR',
}

/**
 * Parses a string to return an Army.
 */
export const parseArmyText = (armyText: string = '', id: string = ''): Army => {
    // console.log('parseArmyText', armyText)
    const parseLog: string[] = [];

    const units: Unit[] = [];
    const log = (message: string) => {
        parseLog.push(message);
    };
    let i = 0;
    let name = '';
    let pointsText = '';
    let state: ParseState = ParseState.Initial;
    let unitText = '';

    // let wargear = [];
    let wargearText = '';

    const addUnit = () => {
        // Coerce points to a number.
        const points = parseInt(pointsText, 10);

        const modelCount = parseCountFromName(name);
        const models = Array.from(Array(modelCount)).map(() => ({
            wargear: [],
        }));

        // Distribute wargear to models.
        distributeWargearToModels(wargearText, models);

        // Add unit to army.
        units.push({
            models,
            name: removeCountFromName(name, false),
            points,
            text: unitText,
        });

        log(
            'Added unit:' +
            `\n\tname: ${name}` +
            `\n\tpoints: ${points}` +
            (wargearText.length ? `\n\twargear: ${wargearText}` : '') +
            `\n\tarmy points total: ${sumUnitsPoints(units)}`,
        );

        name = '';
        pointsText = '';
        unitText = '';

        // wargear = [];
    };

    const atEndOfLine = (): boolean => {
        return armyText[i] === '\n';
    };

    const atEndOfText = (): boolean => {
        return i === armyText.length - 1;
    };

    const inComment = (): boolean => {
        return state == ParseState.InComment;
    };

    const buildPoints = () => {
        // Build points string.
        pointsText += armyText[i];

        log(`Built points: ${pointsText}`);
    };

    const recordUnitName = () => {
        let start = i;

        // Go back to the last '\n'.
        while (start > 0 && armyText[start] !== '\n') {
            start--;
        }

        // Record name.
        name = armyText.substring(start, i).trim();

        log(`Recorded name: ${name}`);
    };

    const recordWargear = () => {
        let start = i;

        // wargear = [];

        // Go back to the last ':'.
        while (start > 0 && armyText[start] !== ':') {
            start--;
        }

        // Step forward 1 to ignore the ':'.
        start++;

        // Record wargear.
        wargearText = armyText.substring(start, i);

        // wargearText.split(',')
        //     .map(function (name) {
        //         wargear.push(name.trim());
        //     });

        log(`Recorded wargear: ${wargearText}`);
    };

    for (i = 0; i < armyText.length; i++) {
        unitText += armyText[i];

        if (armyText[i] === '#') {
            state = ParseState.InComment;
            continue;
        }

        // Skip over comments.
        if (inComment()) {
            if (atEndOfLine() || atEndOfText()) {
                state = ParseState.Initial;
                continue;
            }
            continue;
        }

        // ' - ' denotes the beginning of the points value.
        if (armyText[i] === '-') {
            log(`Found beginning of points value: ${armyText[i]}`);

            if (armyText[i - 1] === ' ' && armyText[i + 1] === ' ') {
                if (state === ParseState.Initial) {
                    recordUnitName();
                } else if (state === ParseState.InWargear) {
                    recordWargear();
                }

                log(`State changed: ${state} -> in points`);

                state = ParseState.InPoints;

                // Prepare string for digit concatenation.
                pointsText = '';
            }

            continue;
        }

        // ':' denotes the end of the name and the beginning of the wargear.
        if (armyText[i] === ':') {
            log(`Found beginning of wargear: ${armyText[i]}`);

            recordUnitName();

            log(`State change: ${state} -> in wargear`);

            state = ParseState.InWargear;
            continue;
        }

        // Characters read over while in points must be concatenated
        //     together so they can be parsed as a number later.
        if (state === ParseState.InPoints) {
            if (!atEndOfLine()) {
                buildPoints();
            }

            // New lines or end of file denote the end of the points value
            //     and also, the end of the unit.
            if (atEndOfLine() || atEndOfText()) {
                addUnit();

                log(`State change: ${state} -> null`);

                state = ParseState.Initial;
            }

            continue;
        }
    }

    const armyProps = {
        id,
        name  : armyText.split('\n')[0].replace(/^#+ /, ''),
        parseLog,
        points: sumUnitsPoints(units),
        text  : armyText,
        units,
    };

    // console.log('parseArmyText result', armyProps);

    return armyProps;
};

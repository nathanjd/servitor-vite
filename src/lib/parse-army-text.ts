import { sumArmyPoints } from "./army.ts"

export interface Model {
    wargear: string[];
}

export interface Unit {
    models: Model[];
    name: string;
    points: number;
    text: string;
}

export interface Army {
    id: string;
    name: string;
    parseLog?: string[];
    points: number;
    text: string;
    units: Unit[];
}

enum ParseState {
    InComment = "IN_COMMENT",
    Initial = "INITIAL",
    InPoints = "IN_POINTS",
    InWargear = "IN_WARGEAR",
}

/**
 * Returns true when all characters in text are numeric and represent a whole
 * positive integer.
 */
const isTextInteger = (text: string): boolean =>
    /^(0|[1-9][0-9]*)$/.test(text);

/**
 *
 * @param {string} wargearText
 * @param {Model[]} models
 * @returns {Model[]}
 */
export const distributeWargearToModels =
    (wargearText: string, models: Model[]): Model[] => {
        // Find any instances of per-model wargear which is a list of wargear
        // surrounded by parentheses.
        const perModelRegExp = /\(([^)]+)\)/g;
        const perModelWargear: string[] = [];
        let matchArray: string[] | null;
        while ((matchArray = perModelRegExp.exec(wargearText)) !== null) {
            perModelWargear.push(matchArray[1]);
        }

        // TODO: Distributing now means assuming all per-model lists come first.
        // fix this to allow for interspersing. Ex: (a, b), c, (a, d)
        for (let i = 0; i < perModelWargear.length; i++) {
            // If there are more per unit wargear lists than models in the unit,
            // put all excess wargear in the last model.
            const modelIndex = i >= models.length ? models.length : i;
            const wargear = perModelWargear[i].split(',')
                .map((name) => name.trim())
                .filter(name => name.length > 0);
            models[modelIndex].wargear.push(...wargear);
        }

        // Remove per-unit wargear from text as they have already been added.
        const remainingWargearText = wargearText.replace(/\([^)]+\),?/g, "");
        const remainingWargear = remainingWargearText.split(',')
            .map((name) => name.trim())
            .filter(name => name.length > 0);

        remainingWargear.forEach((wargear, i) => {
            const wargearCount = parseCountFromName(wargear);

            // Duplicate the wargear if it includes a count.
            const wargearName = removeCountFromName(wargear);
            const wargearToDistribute =
                Array.from(Array(wargearCount)).map(() => wargearName);

            // Assume that any per-model wargear is exhaustive so do not
            // distribute any additional wargear to those models.
            const startingIndex = perModelWargear.length === 0 ? i :
                Math.min(perModelWargear.length + i, models.length - 1)

            for (let j = 0; j < wargearToDistribute.length; j++) {
                // Distribute all the excess wargear to the last model.
                const modelIndex = Math.min(
                    models.length - 1, startingIndex + j);
                models[modelIndex].wargear.push(wargearToDistribute[j]);
            }
        });

        return models;
    };

/**
 * If the first word in the name is a number, assume it is the number of
 * models in a unit. Otherwise, assume the number of models 1.
 */
export const parseCountFromName = (name: string): number => {
    const firstWord = name.split(" ")[0];

    if (!isTextInteger(firstWord)) {
        return 1;
    }

      return parseInt(firstWord, 10);
};

type DepluralizationMap = {
    [key: string]: string;
}

const depluralizationExceptions: DepluralizationMap = {
    "Legionaries": "Legionaries",
};

/**
 * If the first word in the name is a number, remove it.
 */
export const removeCountFromName = (name: string): string => {
    const words  = name.split(" ") || [];
    const firstWord = words[0];

    // First word is not a number so there is no count to remove.
    if (!isTextInteger(firstWord)) {
        return name;
    }

    // Remove first word as it's the count.
    words.shift();
    const nameWithountCount = words.join(" ");

    // Depluralize if count is more than 1.
    if (nameWithountCount.length > 1) {
        if (depluralizationExceptions[nameWithountCount]) {
            return depluralizationExceptions[nameWithountCount];
        }

        // If name ends in 's', remove the 's'.
        if (nameWithountCount[nameWithountCount.length - 1] === "s") {
            return nameWithountCount.substring(0, nameWithountCount.length - 1);
        }

        // Leave name as-is.
    }

    return nameWithountCount;
};

/**
 * Parses a string to return an Army.
 */
export const parseArmyText = (armyText: string = '', id: string = ''): Army => {
    // console.log('parseArmyText', armyText)
    const parseLog: string[] = [];

    const units: Unit[] = [];
    const log = (message: string) => { parseLog.push(message); };
    let i = 0;
    let name = "";
    let pointsText = "";
    let state: ParseState = ParseState.Initial;
    let unitText = "";
    // let wargear = [];
    let wargearText = "";

    function addUnit() {
        // Coerce points to a number.
        const points = parseInt(pointsText, 10);

        const modelCount = parseCountFromName(name);
        const models = Array.from(Array(modelCount)).map(() => ({
            wargear: []
        }));

        // Distribute wargear to models.
        distributeWargearToModels(wargearText, models);

        // Add unit to army.
        units.push({
            models,
            name: removeCountFromName(name),
            points,
            text: unitText,
        });

        log(
            "Added unit:" +
            `\n\tname: ${name}` +
            `\n\tpoints: ${points}` +
            (wargearText.length ? `\n\twargear: ${wargearText}` : "") +
            `\n\tarmy points total: ${sumArmyPoints({ units })}`
        );

        name = "";
        pointsText = "";
        unitText = "";
        // wargear = [];
    }

    function atEndOfLine() {
        return armyText[i] === '\n';
    }

    function atEndOfText() {
        return i === armyText.length - 1;
    }

    function inComment() {
        return state == ParseState.InComment;
    }

    function buildPoints() {
        // Build points string.
        pointsText += armyText[i];

        log(`Built points: ${pointsText}`);
    }

    function recordUnitName() {
         let start = i;

         // Go back to the last '\n'.
         while (start > 0 && armyText[start] !== '\n') {
            start--;
         }

         // Record name.
         name = armyText.substring(start, i).trim();

         log(`Recorded name: ${name}`);
    }

    function recordWargear() {
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
    }

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
                pointsText = "";
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

            continue
        }
    }

    const armyProps = {
        id,
        name: armyText.split('\n')[0].replace(/^#+ /, ""),
        parseLog,
        points: sumArmyPoints({ units }),
        text: armyText,
        units,
    };

    // console.log('parseArmyText result', armyProps);

    return armyProps;
}

import { parseCountFromName } from './parse-count-from-name';
import { removeCountFromName } from './remove-count-from-name';
import { Model } from './parse-army-text';

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
            const modelIndex = i >= models.length ? models.length - 1 : i;
            const wargear = perModelWargear[i].split(',')
                .map((name) => name.trim())
                .filter(name => name.length > 0);
            models[modelIndex].wargear.push(...wargear);
        }

        // Remove per-unit wargear from text as they have already been added.
        const remainingWargearText = wargearText.replace(/\([^)]+\),?/g, '');
        const remainingWargear = remainingWargearText.split(',')
            .map((name) => name.trim())
            .filter(name => name.length > 0);

        remainingWargear.forEach((wargear, i) => {
            const wargearCount = parseCountFromName(wargear);

            // Duplicate the wargear if it includes a count.
            const wargearName = removeCountFromName(wargear, true);
            const wargearToDistribute =
                Array.from(Array(wargearCount)).map(() => wargearName);

            // Assume that any per-model wargear is exhaustive so do not
            // distribute any additional wargear to those models.
            const startingIndex = perModelWargear.length === 0 ? i :
                Math.min(perModelWargear.length + i, models.length - 1);

            for (let j = 0; j < wargearToDistribute.length; j++) {
                // Distribute all the excess wargear to the last model.
                const modelIndex = Math.min(
                    models.length - 1, startingIndex + j);
                models[modelIndex].wargear.push(wargearToDistribute[j]);
            }
        });

        return models;
    };

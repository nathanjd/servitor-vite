import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    armiesToArmyStore,
    loadArmyByName,
    loadArmyStore,
    resetArmiesToDefault,
    saveArmies,
    saveArmy,
    saveArmyStore
} from "./army-service.ts";
import { parseDefaultRawArmies } from "../config/default-raw-armies.ts";

declare var global: {
    localStorage: WindowLocalStorage;
};

describe("armyService", () => {
    let oldLocalStorage: WindowLocalStorage;

    beforeEach(() => {
        oldLocalStorage = global.localStorage;
        global.localStorage = {
            clear: () => {},
            getItem: () => "[]",
            key: () => "",
            length: 1,
            removeItem: () => {},
            setItem: () => {}
        };
    });

    afterEach(() => {
        global.localStorage = oldLocalStorage;
    });

    describe("armiesToArmyStore", () => {
        it("should return an orderedNames that matches the order of armies", () => {
            const armies = [
                {
                    name: "mock-army-name-1",
                    parseLog: [],
                    points: 0,
                    text: "",
                    units: []
                },
                {
                    name: "mock-army-name-2",
                    parseLog: [],
                    points: 0,
                    text: "",
                    units: []
                }
            ];
            const armyStore = armiesToArmyStore(armies);
            expect(armyStore.orderedNames).to.deep.equal([
                armies[0].name,
                armies[1].name
            ]);
        });

        it("should return each army in byName", () => {
            const armies = [
                {
                    name: "mock-army-name-1",
                    parseLog: [],
                    points: 0,
                    text: "",
                    units: []
                },
                {
                    name: "mock-army-name-2",
                    parseLog: [],
                    points: 0,
                    text: "",
                    units: []
                }
            ];
            const armyStore = armiesToArmyStore(armies);
            expect(armyStore.byName[armies[0].name]).to.equal(armies[0]);
            expect(armyStore.byName[armies[1].name]).to.equal(armies[1]);
        });
    });

    describe("loadArmyStore()", () => {
        it("should return a new Object each invocation", () => {
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();

            expect(armyStore).to.not.equal(otherArmyStore);
        });

        it("should return a new Object for orderedNames each invocation", () => {
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();

            expect(armyStore.byName)
                .to.not.equal(otherArmyStore.byName);
        });

        it("should return a new Array for byName each invocation", () => {
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();

            expect(armyStore.orderedNames).to.be.an.instanceof(Array);
            expect(armyStore.orderedNames)
                .to.not.equal(otherArmyStore.orderedNames);
        });

        it("should return a new Object for each army each invocation", () => {
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();
            expect(armyStore.byName[armyStore.orderedNames[0]])
                .to.not.equal(otherArmyStore.byName[armyStore.orderedNames[0]]);
        });

        it("should return the default armies if none are found in local storage", () => {
            const armyStore = loadArmyStore();
            const defaultArmies = parseDefaultRawArmies();
            const expectedArmyStore = armiesToArmyStore(defaultArmies);
            expect(armyStore).to.deep.equal(expectedArmyStore);
        });

        // it("should return the armies in local storage", () => {
        //     const armyStore = armiesToArmyStore([defaultArmy])
        // });
    });
});

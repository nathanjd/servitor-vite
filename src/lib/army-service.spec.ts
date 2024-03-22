import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import stringify from "json-stable-stringify";
import {
    armyStoreKey,
    armiesToArmyStore,
    deleteArmy,
    // loadArmyById,
    // loadArmyByName,
    loadArmyStore,
    resetArmyStoreToDefault,
    saveArmies,
    saveArmy,
    saveArmyStore
} from "./army-service.ts";
import { parseDefaultRawArmies } from "../config/default-raw-armies.ts";
import { Army } from "./parse-army-text.ts";

declare const global: {
    localStorage: Storage;
};

describe("armyService", () => {
    let oldLocalStorage: Storage;
    const getItemMock: Mock<[key: string], string | null> = vi.fn();
    const setItemMock: Mock<[key: string, value: string], void> = vi.fn();

    beforeEach(() => {
        oldLocalStorage = global.localStorage;
        global.localStorage = {
            clear: () => {},
            getItem: getItemMock,
            key: () => "",
            length: 1,
            removeItem: () => {},
            setItem: setItemMock
        };
    });

    afterEach(() => {
        global.localStorage = oldLocalStorage;
        getItemMock.mockReset()
        setItemMock.mockReset()
    });

    describe("armiesToArmyStore(armies: Army[]): ArmyStore", () => {
        it("should return an orderedIds that matches the order of armies", () => {
            // Arrange
            const armies: Army[] = [
                {
                    id: "mock-army-id-1",
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
                {
                    id: "mock-army-id-2",
                    name: "mock-army-name-2",
                    points: 0,
                    text: "mock-army-name-2",
                    units: []
                }
            ];

            // Act
            const armyStore = armiesToArmyStore(armies);

            // Assert
            expect(armyStore.orderedIds).to.deep.equal([
                armies[0].id,
                armies[1].id
            ]);
        });

        it("should return each army in byName", () => {
            // Arrange
            const armies: Army[] = [
                {
                    id: "mock-army-id-1",
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
                {
                    id: "mock-army-id-2",
                    name: "mock-army-name-2",
                    points: 0,
                    text: "mock-army-name-2",
                    units: []
                }
            ];

            // Act
            const armyStore = armiesToArmyStore(armies);

            // Assert
            expect(armyStore.byId[armies[0].id]).to.equal(armies[0]);
            expect(armyStore.byId[armies[1].id]).to.equal(armies[1]);
        });
    });

    describe("deleteArmy(id: string)", () => {
        it("should delete an existing Army from local storage", () => {
            // Arrange
            const armyId = "mock-army-id-1";
            const otherArmy: Army = {
                id: "mock-army-id-2",
                name: "mock-army-name-2",
                points: 0,
                text: "mock-army-name-2",
                units: []
            };
            const armies: Army[] = [
                {
                    id: armyId,
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
                otherArmy
            ];
            const armyStore = armiesToArmyStore(armies);
            const rawArmyStore = stringify(armyStore);
            getItemMock.mockReturnValue(rawArmyStore);

            const expectedArmies = [otherArmy];
            const expectedArmyStore = armiesToArmyStore(expectedArmies);
            const expectedRawArmyStore = stringify(expectedArmyStore);

            // Act
            deleteArmy(armyId);

            // Assert
            expect(setItemMock)
                .toHaveBeenCalledWith(armyStoreKey, expectedRawArmyStore);
        });
    });

    describe("loadArmyStore()", () => {
        it("should return a new Object each invocation", () => {
            // Act
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();

            // Assert
            expect(armyStore).to.not.equal(otherArmyStore);
        });

        it("should return a new Object for byId each invocation", () => {
            // Act
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();

            // Asert
            expect(armyStore.byId).to.not.equal(otherArmyStore.byId);
        });

        it("should return a new Array for orderedIds each invocation", () => {
            // Act
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();

            // Assert
            expect(armyStore.orderedIds).to.be.an.instanceof(Array);
            expect(armyStore.orderedIds)
                .to.not.equal(otherArmyStore.orderedIds);
        });

        it("should return a new Object for each army each invocation", () => {
            // Act
            const armyStore = loadArmyStore();
            const otherArmyStore = loadArmyStore();

            // Assert
            expect(armyStore.byId[armyStore.orderedIds[0]])
                .to.not.equal(otherArmyStore.byId[armyStore.orderedIds[0]]);
        });

        it("should return the default armies if none are found in local storage", () => {
            // Arrange
            const defaultArmies = parseDefaultRawArmies();
            const expectedArmyStore = armiesToArmyStore(defaultArmies);

            // Act
            const armyStore = loadArmyStore();

            // Assert
            expect(armyStore).to.deep.equal(expectedArmyStore);
        });

        it("should return the armies in local storage", () => {
            // Arrange
            const armies: Army[] = [
                {
                    id: "mock-army-id-1",
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
                {
                    id: "mock-army-id-2",
                    name: "mock-army-name-2",
                    points: 0,
                    text: "mock-army-name-2",
                    units: []
                },
            ];
            const expectedArmyStore = armiesToArmyStore(armies);
            const rawArmyStore = stringify(expectedArmyStore);
            getItemMock.mockReturnValue(rawArmyStore);

            // Act
            const armyStore = loadArmyStore();

            // Assert
            expect(getItemMock).toHaveBeenCalledWith(armyStoreKey);
            expect(armyStore).to.deep.equal(expectedArmyStore);
        });
    });

    describe("resetArmyStoreToDefault(): ArmyStore", () => {
        it("should write the default army store to local storage", () => {
            // Arrange
            const defaultArmies = parseDefaultRawArmies();
            const expectedArmyStore = armiesToArmyStore(defaultArmies);
            const expectedRawArmyStore = stringify(expectedArmyStore);

            // Act
            resetArmyStoreToDefault();

            // Assert
            expect(setItemMock).toHaveBeenCalledOnce();
            expect(setItemMock)
                .toHaveBeenCalledWith(armyStoreKey, expectedRawArmyStore);
        });
    });

    describe("saveArmyStore(armyStore: ArmyStore)", () => {
        it("should write the armyStore to local storage", () => {
            // Arrange
            const armies: Army[] = [
                {
                    id: "mock-army-id-1",
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
                {
                    id: "mock-army-id-2",
                    name: "mock-army-name-2",
                    points: 0,
                    text: "mock-army-name-2",
                    units: []
                },
            ];
            const armyStore = armiesToArmyStore(armies);
            const expectedRawArmyStore = stringify(armyStore);

            // Act
            saveArmyStore(armyStore);

            // Assert
            expect(setItemMock)
                .toHaveBeenCalledWith(armyStoreKey, expectedRawArmyStore);
        });
    });

    describe("saveArmies(armies: Army[])", () => {
        it("should write the armies to local storage as an ArmyStore", () => {
            // Arrange
            const armies: Army[] = [
                {
                    id: "mock-army-id-1",
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
                {
                    id: "mock-army-id-2",
                    name: "mock-army-name-2",
                    points: 0,
                    text: "mock-army-name-2",
                    units: []
                },
            ];
            const expectedArmyStore = armiesToArmyStore(armies);
            const expectedRawArmyStore = stringify(expectedArmyStore);

            // Act
            saveArmies(armies);

            // Assert
            expect(setItemMock)
                .toHaveBeenCalledWith(armyStoreKey, expectedRawArmyStore);
        });
    });

    describe("saveArmy(army: Army)", () => {
        it("should create a new Army in local storage", () => {
            // Arrange
            const armies: Army[] = [
                {
                    id: "mock-army-id-1",
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
            ];
            const armyStore = armiesToArmyStore(armies);
            const rawArmyStore = stringify(armyStore);
            getItemMock.mockReturnValue(rawArmyStore);

            const newArmy: Army = {
                id: "mock-army-id-2",
                name: "mock-army-name-2",
                points: 0,
                text: "mock-army-name-2",
                units: []
            };
            const expectedArmyStore = armiesToArmyStore([newArmy, armies[0]]);
            const expectedRawArmyStore = stringify(expectedArmyStore);

            // Act
            saveArmy(newArmy);

            // Assert
            expect(setItemMock)
                .toHaveBeenCalledWith(armyStoreKey, expectedRawArmyStore);
        });

        it("should update an existing Army in local storage", () => {
            // Arrange
            const id = "mock-army-id-2";
            const armies: Army[] = [
                {
                    id: "mock-army-id-1",
                    name: "mock-army-name-1",
                    points: 0,
                    text: "mock-army-name-1",
                    units: []
                },
                {
                    id,
                    name: "mock-army-name-2",
                    points: 0,
                    text: "mock-army-name-2",
                    units: []
                },
            ];
            const armyStore = armiesToArmyStore(armies);
            const rawArmyStore = stringify(armyStore);
            getItemMock.mockReturnValue(rawArmyStore);

            const updatedArmy: Army = {
                id: "mock-army-id-2",
                name: "mock-army-name-2-changed",
                points: 0,
                text: "mock-army-name-2-changed",
                units: []
            };
            const expectedArmyStore = armiesToArmyStore([updatedArmy, armies[0]]);
            const expectedRawArmyStore = stringify(expectedArmyStore);

            // Act
            saveArmy(updatedArmy);

            // Assert
            expect(setItemMock)
                .toHaveBeenCalledWith(armyStoreKey, expectedRawArmyStore);
        });
    });
});

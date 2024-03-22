import { describe, expect, it } from 'vitest';

import { parseArmyText, Unit } from "./parse-army-text.ts";

describe("parseArmyText(text)", () => {
    it("should return a new object each invocation", () => {
        // Act
        const firstResult = parseArmyText("");
        const secondResult = parseArmyText("");

        // Assert
        expect(firstResult).to.not.equal(secondResult);
    });

    it("should parse the army name", () => {
        // Act
        const army = parseArmyText("Mock Army Name\nMock Unit Name - 100\n");

        // Assert
        expect(army).to.include({ name: "Mock Army Name" });
    });

    it("should parse the army name with no new line", () => {
        // Act
        const army = parseArmyText("Mock Army Name");

        // Assert
        expect(army).to.include({ name: "Mock Army Name" });
    });

    it("should ignore markdown headers in the army name", () => {
        // Act
        const army = parseArmyText("# Mock Army Name\n");

        // Assert
        expect(army).to.include({ name: "Mock Army Name" });
    });

    it("should parse a unit with no Wargear", () => {
        // Arrange
        const expectedUnit: Unit = {
            name: "Unit Name",
            models: [
                { wargear: [] },
            ],
            points: 100,
            text: "Unit Name - 100",
        };

        // Act
        const army = parseArmyText(expectedUnit.text);

        // Assert
        const unit = army.units[0];
        expect(unit).to.deep.equal(expectedUnit);
    });

    it("should parse a unit with one Wargear", () => {
        // Arrange
        const expectedUnit: Unit = {
            name: "Unit Name",
            models: [
                { wargear: ["wargear name"] },
            ],
            points: 100,
            text: "Unit Name: wargear name - 100"
        };

        // Act
        const army = parseArmyText(expectedUnit.text);

        // Assert
        const unit = army.units[0];
        expect(unit).to.deep.equal(expectedUnit);
    });

    it("should parse a unit with multiple Wargear", () => {
        // Arrange
        const expectedUnit: Unit = {
            name: "Unit Name",
            models: [
                { wargear: ["wargear 1", "wargear 2"] },
            ],
            points: 100,
            text: "Unit Name: wargear 1, wargear 2 - 100"
        };

        // Act
        const army = parseArmyText(expectedUnit.text);

        // Assert
        const unit = army.units[0];
        expect(unit).to.deep.equal(expectedUnit);
    });

    it("should parse a one-model unit with duplicate wargear", () => {
        // Arrange
        const expectedUnit: Unit = {
            name: "Predator",
            models: [
                { wargear: ["twin-lascannon", "lascannon", "lascannon"] },
            ],
            points: 100,
            text: "Predator: twin-lascannon, 2 lascannons - 100"
        };

        // Act
        const army = parseArmyText(expectedUnit.text);

        // Assert
        const unit = army.units[0];
        expect(unit).to.deep.equal(expectedUnit);
    });

    it("should parse a multi-model unit with duplicate wargear", () => {
        // Arrange
        const expectedUnit: Unit = {
            name: "Cultist Mob",
            models: [
                { wargear: ["flamer"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
                { wargear: ["firearm"] },
            ],
            points: 55,
            text: "10 Cultist Mob: flamer, 9 firearms - 55"
        };

        // Act
        const army = parseArmyText(expectedUnit.text);

        // Assert
        const unit = army.units[0];
        expect(unit).to.deep.equal(expectedUnit);
    });

    it("should parse a multi-model unit with duplicate and per-model wargear", () => {
        // Arrange
        const expectedUnit: Unit = {
            name: "Chosen",
            models: [
                { wargear: ["plasma pistol", "power fist"] },
                { wargear: ["plasma pistol", "pair of accursed weapons"] },
                { wargear: ["combi-weapon"] },
                { wargear: ["combi-weapon"] },
                { wargear: [] },
            ],
            points: 130,
            text: "5 Chosen: (plasma pistol, power fist), (plasma pistol, pair of accursed weapons), 2 combi-weapons - 130"
        };

        // Act
        const army = parseArmyText(expectedUnit.text);

        // Assert
        const unit = army.units[0];
        expect(unit).to.deep.equal(expectedUnit);
    });

    it("should parse all excess wargear to the last model in a unit", () => {
        // Arrange
        const expectedUnit: Unit = {
            name: "Legionaries",
            models: [
                { wargear: ["bolter"] },
                { wargear: ["bolter"] },
                { wargear: ["bolter"] },
                { wargear: ["bolter"] },
                { wargear: ["bolter", "bolter"] },
            ],
            points: 90,
            text: "5 Legionaries: 6 bolters - 90"
        };

        // Act
        const army = parseArmyText(expectedUnit.text);

        // Assert
        const unit = army.units[0];
        expect(unit).to.deep.equal(expectedUnit);
    });

    it("should return the army's total points", () => {
        // Act
        const army = parseArmyText("Army Name\nUnit - 100\nUnit - 50");

        // Assert
        expect(army).to.include({ points: 150 });
    });
});

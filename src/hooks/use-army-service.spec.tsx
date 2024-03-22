import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Army } from '../lib/parse-army-text';
import { ArmyStore, ArmyService, armiesToArmyStore } from '../lib/army-service';
import { useArmyService } from './use-army-service';

describe('useArmyService(armyService: ArmyService', () => {
    const mockDeleteArmy: Mock<[id: string], ArmyStore> = vi.fn();
    const mockLoadArmyStore: Mock<[], ArmyStore> = vi.fn();
    const mockResetArmyStoreToDefault: Mock<[], ArmyStore> = vi.fn();
    const mockSaveArmy: Mock<[army: Army], ArmyStore> = vi.fn();
    const mockSaveArmyStore: Mock<[armyStore: ArmyStore], ArmyStore> = vi.fn();
    const mockArmyService: ArmyService = {
        armyStore              : { byId: {}, orderedIds: [] },
        deleteArmy             : mockDeleteArmy,
        loadArmyStore          : mockLoadArmyStore,
        resetArmyStoreToDefault: mockResetArmyStoreToDefault,
        saveArmy               : mockSaveArmy,
        saveArmyStore          : mockSaveArmyStore,
    };
    const mockDefaultArmies: Army[] = [
        {
            id    : 'mock-army-id-1',
            name  : 'mock-army-name-1',
            points: 0,
            text  : 'mock-army-name-1',
            units : [],
        },
        {
            id    : 'mock-army-id-2',
            name  : 'mock-army-name-2',
            points: 0,
            text  : 'mock-army-name-2',
            units : [],
        },
    ];
    const mockDefaultArmyStore = armiesToArmyStore(mockDefaultArmies);
    let mockArmyStore: ArmyStore;

    beforeEach(() => {
        mockLoadArmyStore.mockImplementation(() => {
            // Create a new object each call to replicate behavior.
            mockArmyStore = armiesToArmyStore(mockDefaultArmies);
            return mockArmyStore;
        });
    });

    afterEach(() => {
        mockArmyService.armyStore = { byId: {}, orderedIds: [] };
        mockLoadArmyStore.mockReset();
        mockSaveArmy.mockReset();
        mockSaveArmyStore.mockReset();
    });

    it('should return the current ArmyStore', () => {
        // Act
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );

        // Assert
        expect(result.current.armyStore).to.equal(mockArmyStore);
    });

    it('should return functions with reference equality across renders', async () => {
        // Arrange
        const { result, rerender } = renderHook(
            () => useArmyService(mockArmyService),
        );

        const {
            loadArmyStore,
            saveArmy,
            saveArmyStore,
        } = result.current;

        // Act
        rerender();

        // Assert
        expect(result.current.loadArmyStore).to.equal(loadArmyStore);
        expect(result.current.saveArmy).to.equal(saveArmy);
        expect(result.current.saveArmyStore).to.equal(saveArmyStore);
    });

    it('should return armyStore with reference equality across renders', async () => {
        // Arrange
        const { result, rerender } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { armyStore } = result.current;

        // Act
        rerender();

        // Assert
        expect(result.current.armyStore).to.equal(armyStore);
    });

    it('should call deleteArmy()', () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { deleteArmy } = result.current;
        const { id } = mockDefaultArmies[0];

        // Act
        deleteArmy(id);

        // Assert
        expect(mockDeleteArmy).toHaveBeenCalledOnce();
        expect(mockDeleteArmy).toHaveBeenCalledWith(id);
    });

    it('should rerender with a new ArmyStore after calling deleteArmy()', async () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { armyStore, deleteArmy } = result.current;
        const { id } = mockDefaultArmies[0];

        // Act
        act(() => {
            deleteArmy(id);
        });

        // Assert
        expect(armyStore).not.to.equal(result.current.armyStore);
    });

    it('should call loadArmyStore()', () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { loadArmyStore } = result.current;

        // Act
        loadArmyStore();

        // Assert
        // First call happens when setting up the hook. Second call is what
        // we're looking for.
        expect(mockLoadArmyStore).toHaveBeenCalledTimes(2);
    });

    it('should rerender with a new ArmyStore after calling loadArmyStore()', async () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { armyStore, loadArmyStore } = result.current;

        // Act
        act(() => {
            loadArmyStore();
        });

        // Assert
        expect(armyStore).not.to.equal(result.current.armyStore);
    });

    it('should call resetArmyStoreToDefault()', () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { resetArmyStoreToDefault } = result.current;

        // Act
        resetArmyStoreToDefault();

        // Assert
        expect(mockResetArmyStoreToDefault).toHaveBeenCalledOnce();
    });

    it('should rerender with a new ArmyStore after calling resetArmyStoreToDefault()', async () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { armyStore, resetArmyStoreToDefault } = result.current;

        // Act
        act(() => {
            resetArmyStoreToDefault();
        });

        // Assert
        expect(armyStore).not.to.equal(result.current.armyStore);
    });

    it('should call saveArmy()', () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { saveArmy } = result.current;
        const army = mockDefaultArmies[0];

        // Act
        saveArmy(army);

        // Assert
        expect(mockSaveArmy).toHaveBeenCalledOnce();
        expect(mockSaveArmy).toHaveBeenCalledWith(army);
    });

    it('should rerender with a new ArmyStore after calling saveArmy()', async () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { armyStore, saveArmy } = result.current;
        const army = mockDefaultArmies[0];

        // Act
        act(() => {
            saveArmy(army);
        });

        // Assert
        expect(armyStore).not.to.equal(result.current.armyStore);
    });

    it('should call saveArmyStore()', () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { saveArmyStore } = result.current;

        // Act
        saveArmyStore(mockDefaultArmyStore);

        // Assert
        expect(mockSaveArmyStore).toHaveBeenCalledOnce();
        expect(mockSaveArmyStore).toHaveBeenCalledWith(mockDefaultArmyStore);
    });

    it('should rerender with a new ArmyStore after calling saveArmyStore()', async () => {
        // Arrange
        const { result } = renderHook(
            () => useArmyService(mockArmyService),
        );
        const { armyStore, saveArmyStore } = result.current;

        // Act
        act(() => {
            saveArmyStore(mockDefaultArmyStore);
        });

        // Assert
        expect(armyStore).not.to.equal(result.current.armyStore);
    });
});

import { useCallback, useState } from 'react';

export const useEditingArmyId = (): [string, (id: string) => void] => {
    // Generate editing army ID if one is not set.
    const storedArmyId = localStorage.getItem('editingArmyId');
    const initalArmyId = storedArmyId || crypto.randomUUID();

    // Set the editing army ID if a new ID was generated.
    if (!storedArmyId) {
        localStorage.setItem('editingArmyId', initalArmyId);
    }

    const [editingArmyId, setEditingArmyId] = useState(initalArmyId);

    // Update localstorage on state change.
    const handleSetEditingArmyId = useCallback((newId: string) => {
        localStorage.setItem('editingArmyId', editingArmyId);
        setEditingArmyId(newId);
    }, [editingArmyId]);

    return [editingArmyId, handleSetEditingArmyId];
};

import { useCallback, useState } from 'react';
import { PointSource } from '../lib/points/points';
import { PointStore, PointService } from '../lib/point-service';

export const usePointService = (pointService: PointService): PointService => {
    const initialPointStore = pointService.loadPointStore();
    const [pointStore, setPointStore] = useState(initialPointStore);

    const loadPointStore = useCallback((): PointStore => {
        const loadedPointStore = pointService.loadPointStore();
        setPointStore(loadedPointStore);
        return loadedPointStore;
    }, [pointService]);

    const resetPointStoreToDefault = useCallback((): PointStore => {
        const savedPointStore = pointService.resetPointStoreToDefault();
        setPointStore(savedPointStore);
        return savedPointStore;
    }, [pointService]);

    const savePointSources = useCallback((sources: PointSource[]) => {
        const savedPointStore = pointService.savePointSources(sources);
        setPointStore(savedPointStore);
        return savedPointStore;
    }, [pointService]);

    const savePointStore = useCallback((newPointStore: PointStore) => {
        const savedPointStore = pointService.savePointStore(newPointStore);
        setPointStore(savedPointStore);
        return savedPointStore;
    }, [pointService]);

    const fetchPointSources = useCallback(
        async (urls: string[]): Promise<PointSource[]> => {
            return pointService.fetchPointSources(urls);
        },
        [pointService],
    );

    return {
        pointStore,
        fetchPointSources,
        loadPointStore,
        resetPointStoreToDefault,
        savePointSources,
        savePointStore,
    };
};

import { PointSource } from './points/points';
import stringify from 'json-stable-stringify';

export const pointStoreKey = 'pointStore';

export interface PointStore {
    byId      : { [id: string]: PointSource };
    orderedIds: string[];
}

export const getDefaultPointStore = (): PointStore => ({
    byId      : {},
    orderedIds: [],
});

export interface PointService {
    pointStore: PointStore;

    fetchPointSources       : (urls: string[]) => Promise<PointSource[]>;
    loadPointStore          : () => PointStore;
    resetPointStoreToDefault: () => PointStore;
    savePointSources        : (sources: PointSource[]) => PointStore;
    savePointStore          : (pointStore: PointStore) => PointStore;
}

/**
 * Convert an array of PointsValues into an optimal storage format.
 */
export const pointsSourcesToPointsStore = (sources: PointSource[]): PointStore => {
    const byId = sources.reduce<{ [id: string]: PointSource }>((byId, source) => {
        byId[source.id] = source;
        return byId;
    }, {});

    const orderedIds = sources.reduce<string[]>((ids, source) => {
        ids.push(source.id);
        return ids;
    }, []);

    return {
        byId,
        orderedIds,
    };
};

/**
 * Load all points from local storage.
 */
export const loadPointStore = (): PointStore => {
    const pointStoreJson = localStorage.getItem(pointStoreKey) || '{}';
    let pointStore: PointStore;

    try {
        pointStore = JSON.parse(pointStoreJson);
    } catch (error) {
        console.error('Error parsing point store JSON:', error);
        return resetPointStoreToDefault();
    }

    // Load the default points if no store is present.
    if (!Array.isArray(pointStore.orderedIds)) {
        return resetPointStoreToDefault();
    }

    return pointStore;
};

/**
 *
 */
export const resetPointStoreToDefault = (): PointStore => {
    return savePointStore(getDefaultPointStore());
};

/**
 * Save point sources to local storage and append their IDs to orderedIds if
 * they don't exist.
 */
export const savePointSources = (sources: PointSource[]): PointStore => {
    const pointStore = loadPointStore();

    sources.forEach(source => {
        // If source is not present in byId, assume it is also not in orderedIds
        // and append it.
        if (!pointStore.byId[source.id]) {
            pointStore.orderedIds.push(source.id);
        }

        pointStore.byId[source.id] = source;
    });

    savePointStore(pointStore);
    return pointStore;
};

/**
 *
 */
export const savePointStore = (pointStore: PointStore): PointStore => {
    localStorage.setItem(pointStoreKey, stringify(pointStore));
    return pointStore;
};

/**
 * Fetch all passed point sources by URL.
 */
export const fetchPointSources = (urls: string[]): Promise<PointSource[]> => {
    const fetchAndDecode = async (url: string): Promise<PointSource> => {
        const response = await fetch(url);
        return await response.json();
    };
    const requests = urls.map(url => fetchAndDecode(url));
    return Promise.all(requests).then(sources => sources);
};

export const pointService: PointService = {
    pointStore: getDefaultPointStore(),
    fetchPointSources,
    loadPointStore,
    resetPointStoreToDefault,
    savePointSources,
    savePointStore,
};

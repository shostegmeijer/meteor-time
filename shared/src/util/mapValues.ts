export const mapValues = <T, R>(obj: Record<string, T>, map: (it: T, key: string) => R) => {
    return Object.keys(obj).reduce((acc, key) => {
        const item = obj[key];
        acc[key] = map(item, key);
        return acc;
    }, {} as Record<string, R>);
};

export const mapValuesAsync = async <T, R>(obj: Record<string, T>, map: (it: T, key: string) => Promise<R>) => {
    const promises = mapValues(obj, map);
    const newObj: Record<string, R> = {};
    for (const key in promises) {
        newObj[key] = await promises[key] as R;
    }
    return newObj;
};
export const groupBy = <T>(list: T[], by: (it: T) => string | number): Record<string, T[]> => {
    return list.reduce((acc, it) => {
        const key = by(it).toString();
        acc[key] = acc[key] || []
        acc[key].push(it);
        return acc;
    }, {} as Record<string, T[]>);
};

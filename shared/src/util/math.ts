export const average = <T>(list: T[], by: (it: T) => number) => sum(list, by) / list.length;
export const sum = <T>(list: T[], by: (it: T) => number) => list.reduce((acc, it) => acc + by(it), 0);
export const min = <T>(list: T[], by: (it: T) => number) => list.reduce((acc, it) => acc > by(it) ? by(it) : acc, Number.MAX_SAFE_INTEGER);
export const max = <T>(list: T[], by: (it: T) => number) => list.reduce((acc, it) => acc < by(it) ? by(it) : acc, 0);
export function areArraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const countMap = (arr: T[]): Map<T, number> => {
    const map = new Map<T, number>();
    for (const item of arr) {
      map.set(item, (map.get(item) ?? 0) + 1);
    }
    return map;
  };

  const aCount = countMap(a);
  const bCount = countMap(b);

  if (aCount.size !== bCount.size) {
    return false;
  }

  for (const [key, count] of aCount.entries()) {
    if (bCount.get(key) !== count) {
      return false;
    }
  }

  return true;
}

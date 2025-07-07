export function arrayToObject<T, K extends keyof any>(
  data: T[],
  key: (i: T) => K,
) {
  return data.reduce(
    (acc, item) => {
      acc[key(item)] = item;
      return acc;
    },
    {} as Partial<Record<K, T>>,
  );
}

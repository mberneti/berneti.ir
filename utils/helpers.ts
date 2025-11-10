import { SimpleObject } from "@/types/generic";

export function isNumber(value: unknown): value is number {
  if (typeof value === "number") return true;
  //TODO: making number of an empty string should not give us a Zero(0) number!
  else if (typeof value === "string") return !isNaN(Number(value));
  return false;
}

export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(
  functionToCheck: unknown
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
): functionToCheck is Function {
  return (
    !!functionToCheck &&
    {}.toString.call(functionToCheck) === "[object Function]"
  );
}

export function isObject<T>(val: unknown): val is SimpleObject<T> {
  return (
    val !== null &&
    typeof val === "object" &&
    Array.isArray(val) === false &&
    Object.prototype.toString.call(val) === "[object Object]"
  );
}

export function isUndefined(data: unknown): data is undefined {
  return typeof data === "undefined";
}

export const hasMoreThanOne = (data?: Array<unknown> | SimpleObject) =>
  !isEmpty(data) &&
  ((data as Array<unknown>)?.length > 1 ||
    (isObject(data) && Object.keys(data).length > 1));

export const cleanEmptyObject = <T>(obj: T): Partial<T> => {
  if (!isObject(obj)) return {};
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) =>
    isEmpty(newObj[key]) ? delete newObj[key] : {}
  );
  return newObj;
};

export function arrToMap<T>(arr?: Array<T>, key = "id") {
  const map: Record<string | number | symbol, T> = {};

  if (!Array.isArray(arr)) return map;
  for (const item of arr) {
    if (isObject(item)) {
      map[item[key] as string | number | symbol] = item;
    } else {
      map[item as unknown as string | number | symbol] = item;
    }
  }

  return map;
}

export const isEmpty = (data: unknown): data is never | undefined | null =>
  (!data && !isNumber(data)) ||
  (Array.isArray(data) && data.length === 0) ||
  (isObject(data) && Object.keys(data).length === 0);

export const hasProperty = <T, K extends string>(
  obj: T,
  key: K
): obj is T & Record<K, ValueOf<T>> =>
  isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);

export const cleanObject = <T extends SimpleObject>(obj?: T): Partial<T> => {
  if (!isObject(obj)) return {};
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) =>
    newObj[key] === undefined ? delete newObj[key] : {}
  );
  return newObj;
};

export const createArrayInRange = (min: number, max: number) => {
  const arrayOfNumbersInRange = [];
  for (let i = min; i <= max; i++) {
    arrayOfNumbersInRange.push(i);
  }
  return arrayOfNumbersInRange;
};

export const isEqualString = (
  item1: string | number,
  item2: string | number
): boolean => item1 + "" === item2 + "";

export function deepCleanNullishValues(obj: SimpleObject | unknown) {
  if (!isObject(obj)) {
    return {};
  }

  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    if (isObject(result[key]))
      result[key] = deepCleanNullishValues(result[key]);
    else if (result[key] === undefined || result[key] === null)
      delete result[key];
  });

  return result;
}

export type DeepReplaceUndefined<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? DeepReplaceUndefined<U>[]
    : T[K] extends object
    ? DeepReplaceUndefined<T[K]>
    : NonNullable<T[K]>;
};

export function deepReplaceUndefinedValuesWithNull<T>(
  obj: T
): DeepReplaceUndefined<T> {
  if (typeof obj !== "object" || obj === null) {
    return obj as DeepReplaceUndefined<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      deepReplaceUndefinedValuesWithNull(item)
    ) as unknown as DeepReplaceUndefined<T>;
  }

  const result: unknown = {};

  Object.entries(obj).forEach(([key, value]) => {
    result[key] =
      value === undefined ? null : deepReplaceUndefinedValuesWithNull(value);
  });

  return result as DeepReplaceUndefined<T>;
}

export function removeEmptyObjectProp(
  arr: Array<SimpleObject>,
  propName: string
) {
  const newArr = arr;
  const filterFilledObject = newArr.filter((obj) => !isEmpty(obj[propName]));
  return filterFilledObject;
}

export function jsonTryParse<T>(text?: string | null): T | null {
  if (text === undefined || text === null) {
    return null;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export function groupBy<T, K extends keyof T>(
  arr: readonly T[],
  keyProperty: K
) {
  return arr.reduce((output, item) => {
    const key = String(item[keyProperty]);
    output[key] ||= [];
    output[key].push(item);
    return output;
  }, {} as Record<string, T[]>);
}

type ValueOf<T> = T[keyof T];

type NestedPartial<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

type PromiseReturnType<T> = Awaited<ReturnType<T>>;

type ExtractValuesWithKeys<ObjectType, Keys> = {
  [ObjectKey in keyof ObjectType]: ObjectKey extends Keys ? ObjectType[ObjectKey] : never;
}[keyof ObjectType];

type WithIsLoading<T> = T & { isLoading?: boolean; isPendingWithCachedData?: boolean };

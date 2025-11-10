export interface SimpleObject<T = unknown> {
  [k: string]: T;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type ArgumentType<F extends Function> = F extends (
  ...args: infer A
) => unknown
  ? A[0]
  : never;

export type EmptyObject = Record<string, never>;

export type SimpleFunction = () => void;

export type QueriesType = SimpleObject<
  string | number | undefined | (string | undefined)[]
>;

// https://www.totaltypescript.com/tips/derive-a-union-type-from-an-object

const a = { foo: 1, bar: "BAR" };

// {
//   foo: number,
//   bar: string
// }
type A = typeof a;

// "foo" | "bar"
type B = keyof A;

// {
//     foo: "foo";
//     bar: "bar";
// }
type C = {
  [K in B]: K;
};

// {
//     foo: {
//         foo: number;
//     };
//     bar: {
//         bar: string;
//     };
// }
type D = {
  [K in B]: {
    [L in K]: A[K];
  };
};

// { foo: string } | { bar: string }
type E = {
  [K in B]: {
    [L in K]: string;
  };
}[keyof A];

// expanded
type F = {
  [K in keyof typeof a]: {
    [L in K]: [typeof a][0][K];
  };
}[keyof typeof a];

// with generics
type DeriveUnion<T> = {
  [K in keyof T]: {
    [L in K]: [T][0][K];
  };
}[keyof T];

type MyUnion = DeriveUnion<typeof a>;

// Union from array of strings
const arr = ["foo", "bar"] as const;

type UnionFromArray = typeof arr[number];

// @ts-expect-error Should be "foo" or "bar"
const _unionFromType: UnionFromArray = "abc";

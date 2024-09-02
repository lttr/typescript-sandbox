// deno-lint-ignore-file no-unused-vars

const unionTuple = ["foo", "bar", "baz"] as const;

type UnionTuple = (typeof unionTuple)[number];

type UnionStrings = "foo" | "bar" | "baz";

const unionObject: Record<UnionTuple, number> = {
  foo: 1,
  bar: 2,
  baz: 3,
};

enum UnionEnum {
  "foo",
  "bar",
  "baz",
}

const UnionObjectStrings = {
  /** This is documentation for the first member of string based enum */
  FOO: "foo",
  BAR: "bar",
  BAZ: "baz",
} as const;

// @ts-expect-error "quax" is not a valid key
UnionObjectStrings.quax = "hax";

type UnionFromObject = keyof typeof UnionObjectStrings;
type ObjectValues<T> = T[keyof T];
type UnionObjectString = ObjectValues<typeof UnionObjectStrings>;

const unionSet = new Set(
  [
    "foo",
    "bar",
    "baz",
  ] as const,
);

type TypeFromSet<T extends Set<unknown>> = T extends Set<infer U> ? U : never;

type UnionFromSet = TypeFromSet<typeof unionSet>;

const unionSetValue: UnionFromSet = "foo";

enum UnionEnumStrings {
  /** This is documentation for the first member of string based enum */
  "FOO" = "foo",
  "BAR" = "bar",
  "BAZ" = "baz",
}

console.log(UnionEnumStrings.BAZ);

// @ts-expect-error "quax" is not a valid key
UnionEnumStrings.quax = "hax";

const enum UnionEnumStringsConst {
  "FOO" = "foo",
  "BAR" = "bar",
  "BAZ" = "baz",
}

function myEnumFunction(param: UnionEnumStrings): void {}
myObjectFunction(UnionEnumStrings.FOO);
// @ts-expect-error "foo" is not a nominal value from this enum
myEnumFunction("foo");

function myObjectFunction(param: UnionObjectString): void {}
myObjectFunction(UnionObjectStrings.FOO);
myObjectFunction(UnionEnumStrings.FOO); // it is structural = possible to use value from enum
myObjectFunction("foo"); // it is structural = possible to use string literal

// @ts-expect-error "quax" is not a valid value
const myTupleValue: UnionTuple = "quax";

// @ts-expect-error "quax" is not a valid value
const myEnumValue: UnionEnum = UnionEnum.quax;

const keysUnionEnum = Object.keys(UnionEnum);
const keysUnionEnumStrings = Object.keys(UnionEnumStrings);
const keysUnionObjectStrings = Object.keys(UnionObjectStrings);
// const enum is erased and not present at runtim
// const keysUnionEnumStringsConst = Object.keys(UnionEnumStringsConst); //

const valuesUnionEnum = Object.values(UnionEnum);
const valuesUnionEnumStrings = Object.values(UnionEnumStrings);
const valuesUnionObjectStrings = Object.values(UnionObjectStrings);
// const enum is erased and not present at runtim
// const valuesUnionEnumStringsConst = Object.values(UnionEnumStringsConst);

// Potentially unexpected result: [ "0", "1", "2", "foo", "bar", "baz" ]
console.log("keys: UnionEnum", keysUnionEnum);
console.log("keys: UnionEnumStrings", keysUnionEnumStrings);
console.log("keys: UnionObjectStrings", keysUnionObjectStrings);

// Potentially unexpected result: [ "0", "1", "2", "foo", "bar", "baz" ]
console.log("values: UnionEnum", valuesUnionEnum);

console.log("values: UnionEnumStrings", valuesUnionEnumStrings);
console.log("values: UnionObjectStrings", valuesUnionObjectStrings);

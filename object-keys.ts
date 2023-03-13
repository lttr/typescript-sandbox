const myObject = {
  a: 1,
  b: 2,
};

function objectKeys<Obj extends Record<string, unknown>>(
  obj: Obj,
): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[];
}

const keys1 = Object.keys(myObject);
for (const key of keys1) {
  // @ts-expect-error: No index signature with a parameter of type 'string' was
  // found on type '{ a: number; b: number; }'.
  console.log(myObject[key]);
}

const keys2 = objectKeys<typeof myObject>(myObject);
for (const key of keys2) {
  console.log(myObject[key]);
}

enum MyEnum {
  "A" = "foo",
  "B" = "bar",
}

const myObjectWithEnumValues = {
  [MyEnum.A]: 1,
  [MyEnum.B]: 2,
};

console.log(myObjectWithEnumValues);

function invertKeysAndValues<T>(
  originalObject: Record<keyof T, unknown>,
): Record<string, keyof T> {
  return Object.fromEntries(
    Object.entries(originalObject).map(([k, v]) => [v, k]),
  );
}

const invertedObject = invertKeysAndValues<typeof myObjectWithEnumValues>(
  myObjectWithEnumValues,
);

console.log(invertedObject);

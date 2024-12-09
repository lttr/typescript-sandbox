function deleteProperty<O extends object, A extends keyof O>(
  input: O,
  property: A,
): Omit<O, A> {
  const clone = { ...input };
  delete clone[property];
  return clone;
}

interface MyObject {
  id: number;
  name: string;
}

const originalObject: MyObject = {
  id: 123,
  name: "Lukas",
};

console.log("original object", originalObject);

const objectWithoutId = deleteProperty(originalObject, "id");
// @ts-expect-error Property 'id' should not exist
console.log(objectWithoutId.id); // undefined
console.log('object without "id"', objectWithoutId);

// @ts-expect-error Property 'XX' should not exist
const objectWithoutXX = deleteProperty(originalObject, "XX");
console.log("object without XX", objectWithoutXX);

console.log("original object", originalObject);

console.log();

// Sometimes destructuring is enough, but unused properties have to be dealt with
// deno-lint-ignore no-unused-vars
const { id, ...rest } = originalObject;
console.log("rest", rest);

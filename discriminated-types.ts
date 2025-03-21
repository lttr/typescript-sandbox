// Using type intersection
//
type DiscriminatedType =
  & {
    sharedProperty: string;
  }
  & (
    | {
      discriminator: "foo";
      foo: number;
    }
    | {
      discriminator: "bar";
      bar: boolean;
    }
  );

// OR with interfaces

interface DiscriminatedBase {
  sharedProperty: string;
  discriminator: "foo" | "bar";
}

interface DiscriminatedFoo extends DiscriminatedBase {
  foo: number;
}

interface DiscriminatedBar extends DiscriminatedBase {
  bar: boolean;
}

type DiscriminatedInterface = DiscriminatedFoo | DiscriminatedBar;

// Usage

// Looks like this on hover:
//
// ```typescript
// const discriminatedFoo: {
//     sharedProperty: string;
// } & {
//     discriminator: "foo";
//     foo: number;
// }
// ```
const discriminatedFoo: DiscriminatedType = {
  sharedProperty: "shared",
  discriminator: "foo",
  foo: 1,
};

// @ts-expect-error: Property 'bar' does not exist on type '{ sharedProperty: string; } & { discriminator: "foo"; foo: number; }'.
const { bar: _ } = discriminatedFoo;
discriminatedFoo.foo = 2;

// Looks like this on hover:
//
// ```typescript
// const discriminatedBar: {
//     sharedProperty: string;
//     discriminator: "bar";
//     bar: true;
// }
// ```
const discriminatedBar = {
  sharedProperty: "shared",
  discriminator: "bar",
  bar: true,
} satisfies DiscriminatedType;

// @ts-expect-error: Type '"foo"' is not assignable to type '"bar"'.
discriminatedBar.discriminator = "foo";

function handleEveryCase(input: DiscriminatedType): string {
  switch (input.discriminator) {
    case "foo":
      return input.foo.toString();
    case "bar":
      return input.bar.toString();
  }
  input satisfies never;
}

handleEveryCase(discriminatedFoo);
handleEveryCase(discriminatedBar);

// Exhaustive check: tests whether all items in a se have been processed
// Switch statement itself: tests whether there is not an extra item

interface Square {
  kind: "square";
  side: number;
}

interface Circle {
  kind: "circle";
  diam: number;
}

type Shape = Square | Circle;

function compute1(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return shape.diam;
    default:
      // @ts-expect-error: Argument of type 'Square' is not assignable to parameter of type 'never'.
      return exhaustiveCheck(shape);
  }
}

function exhaustiveCheck(_param: never): never {
  // throw new Error("should not reach here");
}

function compute2(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return shape.diam;
    default: {
      // @ts-expect-error: Type 'Square' is not assignable to type 'never'.
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
    }
  }
}

function compute3(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return shape.diam;
    // @ts-expect-error: Type '"rectangle"' is not comparable to type '"square" | "circle"'.
    case "rectangle":
      return shape;
    default:
      return shape;
  }
}

console.log(compute1({ kind: "square", side: 1 }));
console.log(compute2({ kind: "square", side: 1 }));
console.log(compute3({ kind: "square", side: 1 }));

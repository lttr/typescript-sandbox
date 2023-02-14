// https://www.totaltypescript.com/tips/use-in-operator-to-transform-a-union-to-another-union

export type Entity =
  | {
    type: "user";
  }
  | {
    type: "post";
  }
  | {
    type: "comment";
  };

type EntityType = Entity["type"];

type EntityWithId = {
  [K in EntityType]: {
    type: K;
  } & Record<`${K}Id`, string>;
}[EntityType];

// Goal:
// type EntityWithId =
//   | {
//     type: "user";
//     userId: string;
//   }
//   | {
//     type: "post";
//     postId: string;
//   }
//   | {
//     type: "comment";
//     commentId: string;
//   };

const a: EntityWithId = {
  type: "comment",
  commentId: "1",
};

type X = ["foo", "bar"];

type Y = {
  [K in X[number]]: string;
};

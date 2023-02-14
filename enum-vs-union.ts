const unionTuple = ["foo", "bar", "baz"] as const;

type UnionTuple = (typeof unionTuple)[number];

type UnionStrings = "foo" | "bar" | "baz";

const unionObject: Record<UnionTuple, number> = {
  "foo": 1,
  "bar": 2,
  "baz": 3,
};

enum UnionEnum {
  "foo",
  "bar",
  "baz",
}

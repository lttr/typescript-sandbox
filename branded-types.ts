// Nominal type = Branded type = Opaque type
// https://zod.dev/?id=brand
// https://twitter.com/mattpocockuk/status/1625173884885401600?s=20

import * as z from "https://deno.land/x/zod/mod.ts";

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

type User = {
  id: string;
};

type AuthorizedUser = Brand<User, "AuthorizedUser">;

function makePayment(user: AuthorizedUser) {
  console.log("user", user);
}

// @ts-expect-error: This is structurally the same, but not branded!
makePayment({ id: "123" });

// ZOD

const Cat = z.object({ name: z.string() }).brand<"Cat">();
type Cat = z.infer<typeof Cat>;

const petCat = (cat: Cat) => {
  console.log("cat", cat);
};

// this works
const simba = Cat.parse({ name: "simba" });
petCat(simba);

// this doesn't
// @ts-expect-error: This was not parsed by zod before
petCat({ name: "fido" });

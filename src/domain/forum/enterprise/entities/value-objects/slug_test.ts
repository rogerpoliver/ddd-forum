import { assertEquals } from "@std/assert";

import { Slug } from "./slug.ts";

Deno.test("should be able to create a new slug from text", () => {
  const slug = Slug.createFromText("Example question title");
  assertEquals(slug.value, "example-question-title");
});

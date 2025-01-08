import { assert } from '@std/assert/assert';

import { Either, left, right } from './either.ts';

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) {
        return right(10);
    } else {
        return left("error");
    }
}

Deno.test("success result", () => {
    const result = doSomeThing(true);
    assert(result.isRight());
    assert(!result.isLeft());
});

Deno.test("error result", () => {
    const result = doSomeThing(false);
    assert(result.isLeft());
    assert(!result.isRight());
});

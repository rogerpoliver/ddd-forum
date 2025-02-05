import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeAnswer } from "../../../../../test/factories/make-answer.ts";
import {
  InMemoryAnswersCommentsRepository,
} from "../../../../../test/repositories/in-memory-answers-comments-repository.ts";
import {
  InMemoryAnswersRepository,
} from "../../../../../test/repositories/in-memory-answers-repository.ts";
import { CommentOnAnswerUseCase } from "./comment-on-answer.ts";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerUseCase;

describe("Create Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersCommentsRepository,
    );
  });

  it("should be able to create a comment on a answer", async () => {
    const answer = makeAnswer();
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "test content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual(
      "test content",
    );
  });
});

import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeQuestion } from "../../../../../test/factories/make-question.ts";
import {
  InMemoryQuestionsCommentsRepository,
} from "../../../../../test/repositories/in-memory-questions-comments-repository.ts";
import {
  InMemoryQuestionsRepository,
} from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { CommentOnQuestionUseCase } from "./comment-on-question.ts";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionsCommentsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsCommentsRepository,
    );
  });

  it("should be able to create a comment on a question", async () => {
    const answer = makeQuestion();
    await inMemoryQuestionsRepository.create(answer);

    const result = await sut.execute({
      questionId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "test content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual(
      "test content",
    );
  });
});

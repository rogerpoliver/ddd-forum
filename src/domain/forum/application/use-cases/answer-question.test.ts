import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import {
  InMemoryAnswerAttachmentsRepository,
} from "../../../../../test/repositories/in-memory-answer-attachments-repository.ts";
import {
  InMemoryAnswersRepository,
} from "../../../../../test/repositories/in-memory-answers-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { AnswerQuestionUseCase } from "./answer-question.ts";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to answer a question", async () => {
    const result = await sut.execute({
      questionId: "1",
      instructorId: new UniqueEntityID("author-1").toString(),
      content: "some content",
      attachmentsIds: ["attachment1", "attachment2"],
    });

    const createdAnswer = inMemoryAnswersRepository.items[0];

    expect(result.isRight()).toBe(true);
    expect(createdAnswer.authorId.toString()).toEqual(
      new UniqueEntityID("author-1").toString(),
    );
    expect(createdAnswer.content).toEqual("some content");
    expect(createdAnswer.attachments.currentItems).toHaveLength(2);

    expect(createdAnswer.attachments.currentItems).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          attachmentId: new UniqueEntityID("attachment1"),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          attachmentId: new UniqueEntityID("attachment2"),
        }),
      }),
    ]);
  });
});

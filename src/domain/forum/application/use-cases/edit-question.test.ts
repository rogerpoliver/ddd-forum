import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeQuestionAttachment } from "../../../../../test/factories/make-question-attachment.ts";
import { makeQuestion } from "../../../../../test/factories/make-question.ts";
import {
  InMemoryQuestionAttachmentsRepository,
} from "../../../../../test/repositories/in-memory-question-attachments-repository.ts";
import {
  InMemoryQuestionsRepository,
} from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { EditQuestionUseCase } from "./edit-question.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository:
  InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    );
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );
    await inMemoryQuestionsRepository.create(newQuestion);

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("2"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("3"),
      }),
    );

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "author-1",
      title: "new title",
      content: "new content",
      attachmentsIds: ["1", "3"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "new title",
      content: "new content",
      attachments: {
        currentItems: [{
          attachmentId: new UniqueEntityID("1"),
        }, {
          attachmentId: new UniqueEntityID("3"),
        }],
      },
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      }),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "author-2",
      title: "new title",
      content: "new content",
      attachmentsIds: ["1"],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

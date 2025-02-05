import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import {
  InMemoryQuestionAttachmentsRepository,
} from "../../../../../test/repositories/in-memory-question-attachments-repository.ts";
import {
  InMemoryQuestionsRepository,
} from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { CreateQuestionUseCase } from "./create-question.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository:
  InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: new UniqueEntityID("author-1").toString(),
      title: "new title",
      content: "some content",
      attachmentsIds: ["attachment1", "attachment2"],
    });

    const createdQuestion = inMemoryQuestionsRepository.items[0];

    expect(result.isRight()).toBe(true);
    expect(createdQuestion.authorId.toString()).toEqual(
      new UniqueEntityID("author-1").toString(),
    );
    expect(createdQuestion.title).toEqual("new title");
    expect(createdQuestion.content).toEqual("some content");
    expect(createdQuestion.attachments.currentItems).toHaveLength(2);

    expect(createdQuestion.attachments.currentItems).toEqual([
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

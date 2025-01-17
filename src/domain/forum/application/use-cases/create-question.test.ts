import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import {
  InMemoryQuestionsRepository,
} from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { CreateQuestionUseCase } from "./create-question.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: new UniqueEntityID("question-1").toString(),
      title: "new title",
      content: "some content",
    });

    const createdQuestion = inMemoryQuestionsRepository.items[0];

    expect(result.isRight()).toBe(true);

    expect(createdQuestion.authorId.toString()).toEqual("question-1");
    expect(createdQuestion.title).toEqual("new title");
    expect(createdQuestion.content).toEqual("some content");
  });
});

import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeQuestion } from "../../../../../test/factories/make-question.ts";
import {
  InMemoryQuestionAttachmentsRepository,
} from "../../../../../test/repositories/in-memory-question-attachments-repository.ts";
import {
  InMemoryQuestionsRepository,
} from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository:
  InMemoryQuestionAttachmentsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Questions by Slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.question.slug.value).toBe("example-question");
    }
  });
});

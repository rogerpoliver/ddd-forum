import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeQuestion } from "../../../../../test/factories/make-question.ts";
import {
  InMemoryQuestionAttachmentsRepository,
} from "../../../../../test/repositories/in-memory-question-attachments-repository.ts";
import {
  InMemoryQuestionsRepository,
} from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository:
  InMemoryQuestionAttachmentsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch recent questions", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 11, 20) }),
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 11, 26) }),
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 11, 24) }),
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.questions).toHaveLength(3);
    expect(result.value?.questions[0].createdAt.getTime()).toEqual(
      new Date(2024, 11, 26).getTime(),
    );
    expect(result.value?.questions[1].createdAt.getTime()).toEqual(
      new Date(2024, 11, 24).getTime(),
    );
    expect(result.value?.questions[2].createdAt.getTime()).toEqual(
      new Date(2024, 11, 20).getTime(),
    );
  });

  it("should be able to fetch recent paginated questions", async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2024, 11, 20) }),
      );
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.questions).toHaveLength(2);
  });
});

import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeAnswer } from "../../../../../test/factories/make-answer.ts";
import {
  InMemoryAnswerAttachmentsRepository,
} from "../../../../../test/repositories/in-memory-answer-attachments-repository.ts";
import {
  InMemoryAnswersRepository,
} from "../../../../../test/repositories/in-memory-answers-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { FetchQuestionsAnswersUseCase } from "./fetch-questions-answers.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: FetchQuestionsAnswersUseCase;

describe("Fetch question's answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch answers by question id", async () => {
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID("question-0"),
    }));
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID("question-0"),
    }));
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID("question-1"),
    }));
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID("question-0"),
    }));

    const resultsFromQuestionZero = await sut.execute({
      questionId: "question-0",
      page: 1,
    });

    const resultsFromQuestionOne = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(resultsFromQuestionZero.isRight()).toBe(true);
    expect(resultsFromQuestionOne.isRight()).toBe(true);
    expect(resultsFromQuestionZero.value?.answers).toHaveLength(3);
    expect(resultsFromQuestionOne.value?.answers).toHaveLength(1);
    expect(resultsFromQuestionZero.value?.answers[0].questionId.toString())
      .toEqual(
        "question-0",
      );
    expect(resultsFromQuestionZero.value?.answers[1].questionId.toString())
      .toEqual(
        "question-0",
      );
    expect(resultsFromQuestionZero.value?.answers[2].questionId.toString())
      .toEqual(
        "question-0",
      );
    expect(resultsFromQuestionOne.value?.answers[0].questionId.toString())
      .toEqual(
        "question-1",
      );
  });

  it("should be able to fetch paginated answers", async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryAnswersRepository.create(makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      }));
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.answers).toHaveLength(2);
  });
});

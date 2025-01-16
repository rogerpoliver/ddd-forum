import { expect } from '@std/expect/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.ts';
import {
    InMemoryQuestionsCommentsRepository
} from '../../../../../test/repositories/in-memory-questions-comments-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { FetchQuestionsCommentsUseCase } from './fetch-questions-comments.ts';

let inMemoryQuestionCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: FetchQuestionsCommentsUseCase;

describe("Fetch questionsComments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionsCommentsRepository();
    sut = new FetchQuestionsCommentsUseCase(
      inMemoryQuestionCommentsRepository,
    );
  });

  it("should be able to fetch questionComments by questionId", async () => {
    const questionId = new UniqueEntityID("question-1");

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: questionId,
      }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: questionId,
      }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: questionId,
      }),
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.questionsComments).toHaveLength(3);
  });

  it("should be able to fetch paginated questionComments by questionId", async () => {
    const questionId = new UniqueEntityID("question-1");

    for (let index = 1; index <= 22; index++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: questionId,
        }),
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.value?.questionsComments).toHaveLength(2);
  });
});

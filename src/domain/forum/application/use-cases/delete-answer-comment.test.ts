import { expect } from '@std/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment.ts';
import {
    InMemoryAnswersCommentsRepository
} from '../../../../../test/repositories/in-memory-answers-comments-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment.ts';
import { NotAllowedError } from '../../../../core/errors/not-allowed-error.ts';

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete AnswersComment", () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswersCommentsRepository);
  });

  it("should be able to delete an answersComment", async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-comment-1"),
    );

    await inMemoryAnswersCommentsRepository.create(newAnswerComment);

    await sut.execute({
      answerCommentId: "answer-comment-1",
      authorId: "author-1",
    });

    expect(inMemoryAnswersCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an answersComment from another user", async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-comment-1"),
    );

    await inMemoryAnswersCommentsRepository.create(newAnswerComment);

    const result = await sut.execute({
      answerCommentId: "answer-comment-1",
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

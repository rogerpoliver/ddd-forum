import { expect } from '@std/expect/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment.ts';
import {
    InMemoryAnswerCommentRepository
} from '../../../../../test/repositories/in-memory-answer-comment-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { FetchAnswersCommentsUseCase } from './fetch-answers-comments.ts';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let sut: FetchAnswersCommentsUseCase;

describe("Fetch answersComments", () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository =
            new InMemoryAnswerCommentRepository();
        sut = new FetchAnswersCommentsUseCase(
            inMemoryAnswerCommentsRepository,
        );
    });

    it("should be able to fetch answerComments by answerId", async () => {
        const answerId = new UniqueEntityID("answer-1");

        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({
                answerId: answerId,
            }),
        );
        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({
                answerId: answerId,
            }),
        );
        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({
                answerId: answerId,
            }),
        );

        const { answersComments } = await sut.execute({
            answerId: "answer-1",
            page: 1,
        });

        expect(answersComments).toHaveLength(3);
    });

    it("should be able to fetch paginated answerComments by answerId", async () => {
        const answerId = new UniqueEntityID("answer-1");

        for (let index = 1; index <= 22; index++) {
            await inMemoryAnswerCommentsRepository.create(
                makeAnswerComment({
                    answerId: answerId,
                }),
            );
        }

        const { answersComments } = await sut.execute({
            answerId: "answer-1",
            page: 2,
        });

        expect(answersComments).toHaveLength(2);
    });
});

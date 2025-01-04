import { expect } from '@std/expect/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.ts';
import {
    InMemoryQuestionCommentRepository
} from '../../../../../test/repositories/in-memory-question-comment-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { FetchQuestionsCommentsUseCase } from './fetch-questions-comments.ts';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository;
let sut: FetchQuestionsCommentsUseCase;

describe("Fetch questionsComments", () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository =
            new InMemoryQuestionCommentRepository();
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

        const { questionsComments } = await sut.execute({
            questionId: "question-1",
            page: 1,
        });

        expect(questionsComments).toHaveLength(3);
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

        const { questionsComments } = await sut.execute({
            questionId: "question-1",
            page: 2,
        });

        expect(questionsComments).toHaveLength(2);
    });
});

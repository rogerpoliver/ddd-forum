import { expect } from '@std/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.ts';
import {
    InMemoryQuestionCommentRepository
} from '../../../../../test/repositories/in-memory-question-comment-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { DeleteQuestionCommentUseCase } from './delete-question-comment.ts';

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete QuestionComment", () => {
    beforeEach(() => {
        inMemoryQuestionCommentRepository =
            new InMemoryQuestionCommentRepository();
        sut = new DeleteQuestionCommentUseCase(
            inMemoryQuestionCommentRepository,
        );
    });

    it("should be able to delete an questionComment", async () => {
        const newQuestionComment = makeQuestionComment(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("question-comment-1"),
        );

        await inMemoryQuestionCommentRepository.create(newQuestionComment);

        await sut.execute({
            questionCommentId: "question-comment-1",
            authorId: "author-1",
        });

        expect(inMemoryQuestionCommentRepository.items).toHaveLength(0);
    });

    it("should not be able to delete an questionComment from another user", async () => {
        const newQuestionComment = makeQuestionComment(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("question-comment-1"),
        );

        await inMemoryQuestionCommentRepository.create(newQuestionComment);

        await expect(sut.execute({
            questionCommentId: "question-comment-1",
            authorId: "author-2",
        })).rejects.toBeInstanceOf(Error);
    });
});

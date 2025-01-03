import { expect } from '@std/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment.ts';
import {
    InMemoryAnswerCommentRepository
} from '../../../../../test/repositories/in-memory-answer-comment-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment.ts';

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete AnswerComment", () => {
    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
        sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository);
    });

    it("should be able to delete an answerComment", async () => {
        const newAnswerComment = makeAnswerComment(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-comment-1"),
        );

        await inMemoryAnswerCommentRepository.create(newAnswerComment);

        await sut.execute({
            answerCommentId: "answer-comment-1",
            authorId: "author-1",
        });

        expect(inMemoryAnswerCommentRepository.items).toHaveLength(0);
    });

    it("should not be able to delete an answerComment from another user", async () => {
        const newAnswerComment = makeAnswerComment(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-comment-1"),
        );

        await inMemoryAnswerCommentRepository.create(newAnswerComment);

        await expect(sut.execute({
            answerCommentId: "answer-comment-1",
            authorId: "author-2",
        })).rejects.toBeInstanceOf(Error);
    });
});

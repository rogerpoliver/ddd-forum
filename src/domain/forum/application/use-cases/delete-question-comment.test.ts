import { expect } from '@std/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.ts';
import {
    InMemoryQuestionsCommentsRepository
} from '../../../../../test/repositories/in-memory-questions-comments-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { DeleteQuestionCommentUseCase } from './delete-question-comment.ts';

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete QuestionsComment", () => {
    beforeEach(() => {
        inMemoryQuestionsCommentsRepository =
            new InMemoryQuestionsCommentsRepository();
        sut = new DeleteQuestionCommentUseCase(
            inMemoryQuestionsCommentsRepository,
        );
    });

    it("should be able to delete an questionsComment", async () => {
        const newQuestionComment = makeQuestionComment(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("question-comment-1"),
        );

        await inMemoryQuestionsCommentsRepository.create(newQuestionComment);

        await sut.execute({
            questionCommentId: "question-comment-1",
            authorId: "author-1",
        });

        expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(0);
    });

    it("should not be able to delete an questionsComment from another user", async () => {
        const newQuestionComment = makeQuestionComment(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("question-comment-1"),
        );

        await inMemoryQuestionsCommentsRepository.create(newQuestionComment);

        await expect(sut.execute({
            questionCommentId: "question-comment-1",
            authorId: "author-2",
        })).rejects.toBeInstanceOf(Error);
    });
});

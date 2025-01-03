import { faker } from '@faker-js/faker';
import { expect } from '@std/expect/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.ts';
import { makeQuestion } from '../../../../../test/factories/make-question.ts';
import {
    InMemoryQuestionCommentRepository
} from '../../../../../test/repositories/in-memory-question-comment-repository.ts';
import {
    InMemoryQuestionsRepository
} from '../../../../../test/repositories/in-memory-questions-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { CommentOnQuestionUseCase } from './comment-on-question.ts';

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create Question Comment", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryQuestionCommentRepository =
            new InMemoryQuestionCommentRepository();

        sut = new CommentOnQuestionUseCase(
            inMemoryQuestionsRepository,
            inMemoryQuestionCommentRepository,
        );
    });

    it("should be able to create a comment on a question", async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("question-1"),
        );

        await inMemoryQuestionsRepository.create(newQuestion);

        const result = await sut.execute({
            authorId: new UniqueEntityID("author-1").toString(),
            questionId: new UniqueEntityID("question-1").toString(),
            content: faker.lorem.text(),
        });

        const questionComments = inMemoryQuestionCommentRepository.items;

        expect(questionComments[0].authorId.toString()).toEqual("author-1");
        expect(questionComments[0].questionId.toString()).toEqual("question-1");
        expect(questionComments[0].content).toEqual(
            result.questionComment.content,
        );
    });
});

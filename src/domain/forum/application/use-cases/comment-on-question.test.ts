import { faker } from '@faker-js/faker';
import { expect } from '@std/expect/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeQuestion } from '../../../../../test/factories/make-question.ts';
import {
    InMemoryQuestionsCommentsRepository
} from '../../../../../test/repositories/in-memory-questions-comments-repository.ts';
import {
    InMemoryQuestionsRepository
} from '../../../../../test/repositories/in-memory-questions-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { CommentOnQuestionUseCase } from './comment-on-question.ts';

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create Question Comment", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryQuestionsCommentsRepository =
            new InMemoryQuestionsCommentsRepository();

        sut = new CommentOnQuestionUseCase(
            inMemoryQuestionsRepository,
            inMemoryQuestionsCommentsRepository,
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

        const questionComments = inMemoryQuestionsCommentsRepository.items;

        expect(questionComments[0].authorId.toString()).toEqual("author-1");
        expect(questionComments[0].questionId.toString()).toEqual("question-1");
        expect(questionComments[0].content).toEqual(
            result.questionsComment.content,
        );
    });
});

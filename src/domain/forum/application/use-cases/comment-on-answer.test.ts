import { faker } from '@faker-js/faker';
import { expect } from '@std/expect/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeAnswer } from '../../../../../test/factories/make-answer.ts';
import {
    InMemoryAnswersCommentsRepository
} from '../../../../../test/repositories/in-memory-answers-comments-repository.ts';
import {
    InMemoryAnswersRepository
} from '../../../../../test/repositories/in-memory-answers-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { CommentOnAnswerUseCase } from './comment-on-answer.ts';

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerUseCase;

describe("Create Answer Comment", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryAnswersCommentsRepository =
            new InMemoryAnswersCommentsRepository();

        sut = new CommentOnAnswerUseCase(
            inMemoryAnswersRepository,
            inMemoryAnswersCommentsRepository,
        );
    });

    it("should be able to create a comment on a answer", async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-1"),
        );

        await inMemoryAnswersRepository.create(newAnswer);

        const result = await sut.execute({
            authorId: new UniqueEntityID("author-1").toString(),
            answerId: new UniqueEntityID("answer-1").toString(),
            content: faker.lorem.text(),
        });

        const answerComments = inMemoryAnswersCommentsRepository.items;

        expect(answerComments[0].authorId.toString()).toEqual("author-1");
        expect(answerComments[0].answerId.toString()).toEqual("answer-1");
        expect(answerComments[0].content).toEqual(
            result.answersComment.content,
        );
    });
});

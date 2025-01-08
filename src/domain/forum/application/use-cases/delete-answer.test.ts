import { expect } from '@std/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeAnswer } from '../../../../../test/factories/make-answer.ts';
import {
    InMemoryAnswersRepository
} from '../../../../../test/repositories/in-memory-answers-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { DeleteAnswerUseCase } from './delete-answer.ts';
import { NotAllowedError } from './errors/not-allowed-error.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
    });

    it("should be able to delete an answer", async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-1"),
        );

        await inMemoryAnswersRepository.create(newAnswer);

        const result = await sut.execute({
            answerId: "answer-1",
            authorId: "author-1",
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toBe(null);
        expect(inMemoryAnswersRepository.items).toHaveLength(0);
    });

    it("should not be able to delete an answer from another user", async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-1"),
        );

        await inMemoryAnswersRepository.create(newAnswer);

        const result = await sut.execute({
            answerId: "answer-1",
            authorId: "author-2",
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });

    it("should not be able to delete an answer that not exists", async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-1"),
        );

        await inMemoryAnswersRepository.create(newAnswer);

        const result = await sut.execute({
            answerId: "answer-321",
            authorId: "author-2",
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    });
});

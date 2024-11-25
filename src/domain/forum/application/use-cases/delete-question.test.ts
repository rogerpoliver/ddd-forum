import { expect } from '@std/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import { makeQuestion } from '../../../../../test/factories/make-question.ts';
import {
    InMemoryQuestionsRepository
} from '../../../../../test/repositories/in-memory-questions-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { DeleteQuestionUseCase } from './delete-question.ts';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
    });

    it("should be able to delete a question", async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("question-1"),
        );

        await inMemoryQuestionsRepository.create(newQuestion);

        await sut.execute({
            questionId: "question-1",
            authorId: "author-1",
        });

        expect(inMemoryQuestionsRepository.items).toHaveLength(0);
    });

    it("should not be able to delete a question from another user", async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("question-1"),
        );

        await inMemoryQuestionsRepository.create(newQuestion);

        await expect(sut.execute({
            questionId: "question-1",
            authorId: "author-2",
        })).rejects.toBeInstanceOf(Error);
    });
});

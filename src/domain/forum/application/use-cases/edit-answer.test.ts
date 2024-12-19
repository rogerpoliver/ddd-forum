import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeAnswer } from "../../../../../test/factories/make-answer.ts";
import {
    InMemoryAnswersRepository,
} from "../../../../../test/repositories/in-memory-answers-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { EditAnswerUseCase } from "./edit-answer.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new EditAnswerUseCase(inMemoryAnswersRepository);
    });

    it("should be able to edit a answer", async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-1"),
        );

        await inMemoryAnswersRepository.create(newAnswer);

        await sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: "author-1",
            content: "new content",
        });

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: "new content",
        });
    });

    it("should not be able to edit a answer from another user", async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID("author-1"),
            },
            new UniqueEntityID("answer-1"),
        );

        await inMemoryAnswersRepository.create(newAnswer);

        await expect(sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: "author-2",
            content: "new content",
        })).rejects.toBeInstanceOf(Error);
    });
});

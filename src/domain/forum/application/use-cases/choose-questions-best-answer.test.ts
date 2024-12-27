import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeAnswer } from "../../../../../test/factories/make-answer.ts";
import { makeQuestion } from "../../../../../test/factories/make-question.ts";
import {
    InMemoryAnswersRepository,
} from "../../../../../test/repositories/in-memory-answers-repository.ts";
import {
    InMemoryQuestionsRepository,
} from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { ChooseQuestionsBestAnswerUseCase } from "./choose-questions-best-answer.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionsBestAnswerUseCase;

describe("Choose Question's best answer", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new ChooseQuestionsBestAnswerUseCase(
            inMemoryQuestionsRepository,
            inMemoryAnswersRepository,
        );
    });

    it("should be able to choose the question's best answer", async () => {
        const question = makeQuestion();
        const answer = makeAnswer({
            questionId: question.id,
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString(),
            questionId: question.id.toString(),
        });

        expect(inMemoryQuestionsRepository.items[0].bestAnswerId)
            .toBe(answer.id);
    });

    it("should not be able to to choose another users question best answer", async () => {
        const question = makeQuestion();
        const answer = makeAnswer({
            questionId: question.id,
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        await expect(sut.execute({
            answerId: answer.id.toString(),
            authorId: "anotherAuthor",
            questionId: question.id.toString(),
        })).rejects.toBeInstanceOf(Deno.errors.PermissionDenied);
    });
});

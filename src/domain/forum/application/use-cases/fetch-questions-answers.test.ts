import { expect } from "@std/expect/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { makeAnswer } from "../../../../../test/factories/make-answer.ts";
import {
    InMemoryAnswersRepository,
} from "../../../../../test/repositories/in-memory-answers-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { FetchQuestionsAnswersUseCase } from "./fetch-questions-answer.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionsAnswersUseCase;

describe("Fetch question's answers", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
    });

    it("should be able to fetch answers by question id", async () => {
        await inMemoryAnswersRepository.create(makeAnswer({
            questionId: new UniqueEntityID("question-0"),
        }));
        await inMemoryAnswersRepository.create(makeAnswer({
            questionId: new UniqueEntityID("question-0"),
        }));
        await inMemoryAnswersRepository.create(makeAnswer({
            questionId: new UniqueEntityID("question-1"),
        }));
        await inMemoryAnswersRepository.create(makeAnswer({
            questionId: new UniqueEntityID("question-0"),
        }));

        const { answers: answersFromQuestionZero } = await sut.execute({
            questionId: "question-0",
            page: 1,
        });
        const { answers: answersFromQuestionOne } = await sut.execute({
            questionId: "question-1",
            page: 1,
        });

        expect(answersFromQuestionZero).toHaveLength(3);
        expect(answersFromQuestionOne).toHaveLength(1);
        expect(answersFromQuestionZero[0].questionId.toString()).toEqual(
            "question-0",
        );
        expect(answersFromQuestionZero[1].questionId.toString()).toEqual(
            "question-0",
        );
        expect(answersFromQuestionZero[2].questionId.toString()).toEqual(
            "question-0",
        );
        expect(answersFromQuestionOne[0].questionId.toString()).toEqual(
            "question-1",
        );
    });

    it("should be able to fetch paginated answers", async () => {
        for (let index = 1; index <= 22; index++) {
            await inMemoryAnswersRepository.create(makeAnswer({
                questionId: new UniqueEntityID("question-1"),
            }));
        }

        const { answers } = await sut.execute({
            questionId: "question-1",
            page: 2,
        });

        expect(answers).toHaveLength(2);
    });
});

import { expect, test } from "vitest";

import { AnswerQuestionsUseCase } from "./answer-question";

import type { Answer } from "../entities/answer";
import type { AnswersRepository } from "../repositories/answers-repositoriy";

const fakeAnswersRepository: AnswersRepository = {
	create: async (answer: Answer) => {
		return;
	},
};

test("create an answer", async () => {
	const answerQuestion = new AnswerQuestionsUseCase(fakeAnswersRepository);

	const answer = await answerQuestion.execute({
		questionId: "1",
		instructorId: "1",
		content: "New Answer",
	});

	expect(answer.content).toEqual("New Answer");
});

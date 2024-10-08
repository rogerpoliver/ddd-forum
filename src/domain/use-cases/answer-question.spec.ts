import { expect, test } from "vitest";

import { AnswerQuestionsUseCase } from "./answer-question";

test("create an answer", () => {
	const answerQuestion = new AnswerQuestionsUseCase();

	const answer = answerQuestion.execute({
		questionId: "1",
		instructorId: "1",
		content: "New Answer",
	});

	expect(answer.content).toEqual("New Answer");
});

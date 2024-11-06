import { assertEquals } from "@std/assert";

import { AnswerQuestionsUseCase } from "./answer-question.ts";

import type { Answer } from "../entities/answer.ts";
import type { AnswersRepository } from "../repositories/answers-repositoriy.ts";

const fakeAnswersRepository: AnswersRepository = {
  // deno-lint-ignore require-await
  create: async (_answer: Answer) => {
    return;
  },
};

Deno.test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionsUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "New Answer",
  });

  assertEquals(answer.content, "New Answer");
});

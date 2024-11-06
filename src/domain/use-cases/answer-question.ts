import { UniqueEntityID } from "../../core/entities/unique-entity-id.ts";
import { Answer } from "../entities/answer.ts";

import type { AnswersRepository } from "../repositories/answers-repositoriy.ts";

interface AnswerQuestionsUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionsUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionsUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    return answer;
  }
}

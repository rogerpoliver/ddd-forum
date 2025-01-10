import { Either, right } from '../../../../core/either.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { Answer } from '../../enterprise/entities/answer.ts';

import type { AnswersRepository } from "../repositories/answers-repository.ts";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<null, {
  answer: Answer;
}>;

export class AnswerQuestionsUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    this.answersRepository.create(answer);

    return Promise.resolve(right({ answer }));
  }
}

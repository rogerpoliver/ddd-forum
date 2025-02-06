import { Either, right } from "../../../../core/either.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.ts";
import { AnswerAttachmentsList } from "../../enterprise/entities/answer-attachments-list.ts";
import { Answer } from "../../enterprise/entities/answer.ts";

import type { AnswersRepository } from "../repositories/answers-repository.ts";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<null, {
  answer: Answer;
}>;

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: new UniqueEntityID(answer.id.toString()),
      });
    });

    answer.attachments = new AnswerAttachmentsList(answerAttachments);

    this.answersRepository.create(answer);

    return Promise.resolve(right({ answer }));
  }
}

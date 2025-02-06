import { Either, left, right } from "../../../../core/either.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.ts";
import { AnswerAttachmentsList } from "../../enterprise/entities/answer-attachments-list.ts";
import { Answer } from "../../enterprise/entities/answer.ts";
import { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository.ts";
import { AnswersRepository } from "../repositories/answers-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute(
    { authorId, answerId, content, attachmentsIds }: EditAnswerUseCaseRequest,
  ): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments = await this.answerAttachmentsRepository
      .findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentsList(
      currentAnswerAttachments,
    );

    const answerAttachments = attachmentsIds.map((attachmentsId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.content = content;
    answer.attachments = answerAttachmentList;

    await this.answersRepository.save(answer);
    return right({ answer });
  }
}

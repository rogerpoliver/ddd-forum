import { Either, left, right } from "../../../../core/either.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.ts";
import { QuestionAttachmentsList } from "../../enterprise/entities/question-attachments-list.ts";
import { Question } from "../../enterprise/entities/question.ts";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository.ts";
import { QuestionsRepository } from "../repositories/questions-repository.ts";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error.ts";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute(
    { authorId, questionId, title, content, attachmentsIds }:
      EditQuestionUseCaseRequest,
  ): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments = await this.questionAttachmentsRepository
      .findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentsList(
      currentQuestionAttachments,
    );

    const questionAttachments = attachmentsIds.map((attachmentsId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentList;

    await this.questionsRepository.save(question);
    return right({ question });
  }
}

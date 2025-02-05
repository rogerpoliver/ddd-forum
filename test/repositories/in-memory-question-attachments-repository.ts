import {
  QuestionAttachmentsRepository,
} from "../../src/domain/forum/application/repositories/question-attachments-repository.ts";
import {
  QuestionAttachment,
} from "../../src/domain/forum/enterprise/entities/question-attachment.ts";

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  deleteManyByQuestionId(questionId: string): Promise<void> {
    this.items = this.items.filter((item) =>
      item.questionId.toString() !== questionId
    );

    return Promise.resolve();
  }

  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter((item) =>
      item.questionId.toString() === questionId
    );

    return Promise.resolve(questionAttachments);
  }
}

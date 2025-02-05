import {
  QuestionAttachmentsRepository,
} from "../../src/domain/forum/application/repositories/question-attachments-repository.ts";
import {
  QuestionAttachment,
} from "../../src/domain/forum/enterprise/entities/question-attachment.ts";

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter((item) =>
      item.questionId.toString() === questionId
    );

    return Promise.resolve(questionAttachments);
  }
}

import {
  AnswerAttachmentsRepository,
} from "../../src/domain/forum/application/repositories/answer-attachments-repository.ts";
import { AnswerAttachment } from "../../src/domain/forum/enterprise/entities/answer-attachment.ts";

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = [];

  deleteManyByAnswerId(answerId: string): Promise<void> {
    this.items = this.items.filter((item) =>
      item.answerId.toString() !== answerId
    );

    return Promise.resolve();
  }

  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items.filter((item) =>
      item.answerId.toString() === answerId
    );

    return Promise.resolve(answerAttachments);
  }
}

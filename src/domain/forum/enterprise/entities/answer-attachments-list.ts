import { WatchedList } from "../../../../core/entities/watched-list.ts";
import { AnswerAttachment } from "./answer-attachment.ts";

export class AnswerAttachmentsList extends WatchedList<AnswerAttachment> {
  override compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}

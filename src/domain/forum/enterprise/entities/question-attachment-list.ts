import { WatchedList } from "../../../../core/entities/watched-list.ts";
import { QuestionAttachment } from "./question-attachment.ts";

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  override compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}

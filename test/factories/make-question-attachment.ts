import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.ts";
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from "../../src/domain/forum/enterprise/entities/question-attachment.ts";

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionsAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return questionsAttachment;
}

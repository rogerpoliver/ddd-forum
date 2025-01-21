import { Entity } from "../../../../core/entities/entity.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";

interface AnswerAttachmentProps {
  answerId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  getAttachmentId() {
    return this.props.attachmentId;
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, id);
    return attachment;
  }
}

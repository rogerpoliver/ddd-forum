import { Entity } from '../../../../core/entities/entity.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';

export interface QuestionAttachmentProps {
  questionId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const questionAttachment = new QuestionAttachment(props, id);

    return questionAttachment;
  }
}

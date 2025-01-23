import { dayjs } from '@xtool/dayjs';

import { AggregateRoot } from '../../../../core/entities/aggregate-root.ts';
import { Optional } from '../../../../core/types/optional.ts';
import { AnswerAttachment } from './answer-attachment.ts';

import type { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
export interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  attachments: AnswerAttachment[];
}

export class Answer extends AggregateRoot<AnswerProps> {
  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get content() {
    return this.props.content;
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 20).trimEnd().concat("...");
  }

  get isNew() {
    return dayjs().diff(this.props.createdAt, "day") <= 3;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get attachments() {
    return this.props.attachments;
  }

  static create(
    props: Optional<AnswerProps, "createdAt" | "attachments">,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      attachments: props.attachments ?? [],
    }, id);
    return answer;
  }
}

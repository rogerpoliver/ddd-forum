import { dayjs } from '@xtool/dayjs';

import { Entity } from '../../core/entities/entity.ts';
import { Optional } from '../../core/types/optional.ts';

import type { UniqueEntityID } from "../../core/entities/unique-entity-id.ts";
interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get authorId() {
    return this.props.authorId;
  }

  set authorId(value: UniqueEntityID) {
    this.props.authorId = value;
  }

  get questionId() {
    return this.props.questionId;
  }

  set questionId(value: UniqueEntityID) {
    this.props.questionId = value;
  }

  get content() {
    return this.props.content;
  }

  set content(value: string) {
    this.props.content = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date | undefined) {
    this.props.updatedAt = value;
  }

  get isNew() {
    return dayjs().diff(this.props.createdAt, "day") <= 3;
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, id);
    return answer;
  }
}

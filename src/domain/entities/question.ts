import { dayjs } from '@xtool/dayjs';

import { Entity } from '../../core/entities/entity.ts';
import { Optional } from '../../core/types/optional.ts';

import type { UniqueEntityID } from "../../core/entities/unique-entity-id.ts";
import type { Slug } from "./value-objects/slug.ts";

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId: UniqueEntityID;
  title: string;
  slug: Slug;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  set authorId(value: UniqueEntityID) {
    this.props.authorId = value;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  set bestAnswerId(value: UniqueEntityID) {
    this.props.bestAnswerId = value;
  }

  get title() {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get slug() {
    return this.props.slug;
  }

  set slug(value: Slug) {
    this.props.slug = value;
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

  isNew() {
    return dayjs().diff(this.props.createdAt, 'day') <= 3;
  }

  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id);
    return question;
  }
}

import { dayjs } from '@xtool/dayjs';

import { Entity } from '../../../../core/entities/entity.ts';
import { Optional } from '../../../../core/types/optional.ts';
import { Slug } from './value-objects/slug.ts';

import type { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
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

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  set bestAnswerId(value: UniqueEntityID) {
    this.props.bestAnswerId = value;
    this.touch();
  }

  get title() {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
    this.props.slug = Slug.createFromText(value);
    this.touch();
  }

  get slug() {
    return this.props.slug;
  }

  set slug(value: Slug) {
    this.props.slug = value;
    this.touch();
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

  get isNew() {
    return dayjs().diff(this.props.createdAt, "day") <= 3;
  }

  get execerpt() {
    return this.content.substring(0, 20).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityID,
  ) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
      slug: props.slug ?? Slug.createFromText(props.title),
    }, id);
    return question;
  }
}

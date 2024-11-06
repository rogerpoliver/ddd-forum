import { Entity } from "../../core/entities/entity.ts";
import { Optional } from "../../core/types/optional.ts";

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

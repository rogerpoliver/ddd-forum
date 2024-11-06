import { Entity } from "../../core/entities/entity.ts";
import { UniqueEntityID } from "../../core/entities/unique-entity-id.ts";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  static create(
    props: InstructorProps,
    id?: UniqueEntityID,
  ) {
    const instructor = new Instructor(props, id);
    return instructor;
  }
}

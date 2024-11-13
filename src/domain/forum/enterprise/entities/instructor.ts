import { Entity } from '../../../../core/entities/entity.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  static create(
    props: InstructorProps,
    id?: UniqueEntityID,
  ) {
    const instructor = new Instructor(props, id);
    return instructor;
  }
}

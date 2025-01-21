import { Entity } from "../../../../core/entities/entity.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  static create(
    props: StudentProps,
    id?: UniqueEntityID,
  ) {
    const student = new Student(props, id);
    return student;
  }
}

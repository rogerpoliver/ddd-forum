import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { DomainEvent } from "../../../../core/events/domain-event.ts";
import { Answer } from "../entities/answer.ts";

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id;
  }
}

import { UniqueEntityID } from "../entities/unique-entity-id.ts";

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}

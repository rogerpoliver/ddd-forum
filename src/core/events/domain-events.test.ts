import { describe, it } from "@std/testing/bdd";
import { AggregateRoot } from "../entities/aggregate-root.ts";
import { UniqueEntityID } from "../entities/unique-entity-id.ts";
import { DomainEvent } from "./domain-event.ts";
import { DomainEvents } from "./domain-events.ts";
import { expect } from "@std/expect/expect";
import { assertSpyCalls, spy } from "@std/testing/mock";

class CustomAggregateCreated implements DomainEvent {
  ocurredAt: Date;
  aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("Domain events", () => {
  it("should be able to dispatch and listen to events", () => {
    const callbackSpy = spy();

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);
    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents).toHaveLength(1);
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    assertSpyCalls(callbackSpy, 1);
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});

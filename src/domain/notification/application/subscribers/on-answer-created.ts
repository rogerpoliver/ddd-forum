import { DomainEvents } from "../../../../core/events/domain-events.ts";
import { EventHandler } from "../../../../core/events/event-handler.ts";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created.ts";

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      (event: unknown) =>
        this.sendNewAnswerNotification(event as AnswerCreatedEvent),
      AnswerCreatedEvent.name,
    );
  }

  private sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log(answer);
  }
}

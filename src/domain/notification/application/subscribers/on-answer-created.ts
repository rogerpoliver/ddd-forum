import { DomainEvents } from "../../../../core/events/domain-events.ts";
import { EventHandler } from "../../../../core/events/event-handler.ts";
import { QuestionsRepository } from "../../../forum/application/repositories/questions-repository.ts";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created.ts";
import { SendNotificationUseCase } from "../use-cases/send-notification.ts";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      (event: unknown) =>
        this.sendNewAnswerNotification(event as AnswerCreatedEvent),
      AnswerCreatedEvent.name,
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `New answer for "${
          question.title.substring(0, 40).concat("...")
        }"`,
        content: answer.excerpt,
      });
    }
  }
}

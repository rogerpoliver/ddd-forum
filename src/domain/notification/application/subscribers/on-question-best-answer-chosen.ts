import { DomainEvents } from "../../../../core/events/domain-events.ts";
import { EventHandler } from "../../../../core/events/event-handler.ts";
import { AnswersRepository } from "../../../forum/application/repositories/answers-repository.ts";
import { QuestionBestAnswerChosenEvent } from "../../../forum/enterprise/events/question-best-answer-chosen-event.ts";
import { SendNotificationUseCase } from "../use-cases/send-notification.ts";

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      (event: unknown) =>
        this.sendQuestionBestAnswerNotification(
          event as QuestionBestAnswerChosenEvent,
        ),
      QuestionBestAnswerChosenEvent.name,
    );
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    );

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `You answer was chosen!`,
        content: `The answer you post for "${
          question.title
            .substring(0, 20)
            .concat("...")
        }" was chosen by the author!"`,
      });
    }
  }
}

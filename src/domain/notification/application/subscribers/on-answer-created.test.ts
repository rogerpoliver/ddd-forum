import { beforeEach, describe, it } from "@std/testing/bdd";
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository.ts";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.ts";
import { OnAnswerCreated } from "./on-answer-created.ts";
import { makeAnswer } from "../../../../../test/factories/make-answer.ts";
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository.ts";
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repository.ts";
import { SendNotificationUseCase } from "../use-cases/send-notification.ts";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.ts";
import { makeQuestion } from "../../../../../test/factories/make-question.ts";
import { assertSpyCalls, Spy, spy } from "@std/testing/mock";
import { waitFor } from "../../../../../test/utils/wait-for.ts";

let inMemoryQuestionAttachmentsRepository:
  InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;
let sendNotificationExecuteSpy: Spy;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    sendNotificationExecuteSpy = spy(sendNotificationUseCase, "execute");

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase);
  });

  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    await waitFor(() => {
      assertSpyCalls(sendNotificationExecuteSpy, 1);
    });
  });
});

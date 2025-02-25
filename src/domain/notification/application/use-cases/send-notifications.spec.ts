import { beforeEach, describe, it } from "@std/testing/bdd";
import { SendNotificationUseCase } from "./send-notification.ts";
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repository.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { expect } from "@std/expect/expect";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to send a notification", async () => {
    const result = await sut.execute({
      recipientId: new UniqueEntityID("author-1").toString(),
      title: "new notification",
      content: "some content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      result.value?.notification,
    );
  });
});

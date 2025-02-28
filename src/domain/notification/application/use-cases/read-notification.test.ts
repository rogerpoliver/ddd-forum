import { beforeEach, describe, it } from "@std/testing/bdd";
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repository.ts";
import { expect } from "@std/expect/expect";
import { ReadNotificationUseCase } from "./read-notification.ts";
import { makeNotification } from "../../../../../test/factories/make-notification.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error.ts";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification();
    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to read a notification from another user", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("my-user-id"),
    });
    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: "another-user-id",
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

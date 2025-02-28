import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.ts";
import {
  Notification,
  NotificationProps,
} from "../../src/domain/notification/enterprise/entities/notification.ts";

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create({
    recipientId: new UniqueEntityID(),
    title: faker.lorem.sentence(4),
    content: faker.lorem.sentence(10),
    ...override,
  }, id);

  return notification;
}

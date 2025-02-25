import { NotificationsRepository } from "../../src/domain/notification/application/repositories/notifications-repository.ts";
import { Notification } from "../../src/domain/notification/enterprise/entities/notification.ts";

export class InMemoryNotificationsRepository
  implements NotificationsRepository {
  public notifications: Notification[] = [];

  create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
    return Promise.resolve();
  }
}

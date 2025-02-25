import { Notification } from "../../enterprise/entities/notification.ts";

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>;
}

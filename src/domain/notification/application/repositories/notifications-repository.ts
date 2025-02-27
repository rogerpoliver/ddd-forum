import { Notification } from "../../enterprise/entities/notification.ts";

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  save(notification: Notification): Promise<void>;
}

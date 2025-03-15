import { Either, right } from "../../../../core/either.ts";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";
import { Notification } from "../../enterprise/entities/notification.ts";
import { NotificationsRepository } from "../repositories/notifications-repository.ts";

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export type SendNotificationUseCaseResponse = Either<null, {
  notification: Notification;
}>;

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    { recipientId, title, content }: SendNotificationUseCaseRequest,
  ): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });
    await this.notificationsRepository.create(notification);

    return right({
      notification,
    });
  }
}

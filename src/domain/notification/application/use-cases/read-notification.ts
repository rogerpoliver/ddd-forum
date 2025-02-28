import { Either, left, right } from "../../../../core/either.ts";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error.ts";
import { Notification } from "../../enterprise/entities/notification.ts";
import { NotificationsRepository } from "../repositories/notifications-repository.ts";

interface ReadNotificationUseCaseRequest {
  notificationId: string;
  recipientId: string;
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    { notificationId, recipientId }: ReadNotificationUseCaseRequest,
  ): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({
      notification,
    });
  }
}

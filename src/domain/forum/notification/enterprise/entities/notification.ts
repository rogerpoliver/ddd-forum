import { Entity } from "../../../../../core/entities/entity.ts";
import { UniqueEntityID } from "../../../../../core/entities/unique-entity-id.ts";
import { Optional } from "../../../../../core/types/optional.ts";

interface NotificationProps {
  recipientId: UniqueEntityID;
  title: string;
  content: string;
  readAt?: boolean;
  createdAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get readAt() {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<NotificationProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);
    return notification;
  }
}

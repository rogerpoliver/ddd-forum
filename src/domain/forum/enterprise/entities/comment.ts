import { Entity } from "../../../../core/entities/entity.ts";

import type { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";

export interface CommentProps {
    authorId: UniqueEntityID;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
}

export abstract class Comment<Props extends CommentProps>
    extends Entity<Props> {
    get authorId() {
        return this.props.authorId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    get content() {
        return this.props.content;
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }
}

import { Optional } from '../../../../core/types/optional.ts';
import { Comment, CommentProps } from './comment.ts';

import type { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";

export interface AnswerCommentProps extends CommentProps {
    answerId: UniqueEntityID;
}

export class AnswersComment extends Comment<AnswerCommentProps> {
    get answerId() {
        return this.props.answerId;
    }

    static create(
        props: Optional<AnswerCommentProps, "createdAt">,
        id?: UniqueEntityID,
    ) {
        const answersComment = new AnswersComment(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );
        return answersComment;
    }
}

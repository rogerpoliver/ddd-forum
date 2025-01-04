import { Optional } from '../../../../core/types/optional.ts';
import { Comment, CommentProps } from './comment.ts';

import type { UniqueEntityID } from "../../../../core/entities/unique-entity-id.ts";

export interface QuestionCommentProps extends CommentProps {
    questionId: UniqueEntityID;
}

export class QuestionsComment extends Comment<QuestionCommentProps> {
    get questionId() {
        return this.props.questionId;
    }

    static create(
        props: Optional<QuestionCommentProps, "createdAt">,
        id?: UniqueEntityID,
    ) {
        const questionsComment = new QuestionsComment(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );
        return questionsComment;
    }
}

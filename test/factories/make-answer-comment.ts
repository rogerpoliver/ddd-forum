import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts';
import {
    AnswerComment, AnswerCommentProps
} from '../../src/domain/forum/enterprise/entities/answer-comment.ts';

export function makeAnswerComment(
    override: Partial<AnswerCommentProps> = {},
    id?: UniqueEntityID,
) {
    const answerComment = AnswerComment.create({
        authorId: new UniqueEntityID(),
        answerId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override,
    }, id);

    return answerComment;
}

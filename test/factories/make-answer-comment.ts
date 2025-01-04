import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts';
import {
    AnswerCommentProps, AnswersComment
} from '../../src/domain/forum/enterprise/entities/answer-comment.ts';

export function makeAnswerComment(
    override: Partial<AnswerCommentProps> = {},
    id?: UniqueEntityID,
) {
    const answersComment = AnswersComment.create({
        authorId: new UniqueEntityID(),
        answerId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override,
    }, id);

    return answersComment;
}

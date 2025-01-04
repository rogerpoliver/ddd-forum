import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts';
import {
    QuestionCommentProps, QuestionsComment
} from '../../src/domain/forum/enterprise/entities/question-comment.ts';

export function makeQuestionComment(
    override: Partial<QuestionCommentProps> = {},
    id?: UniqueEntityID,
) {
    const questionsComment = QuestionsComment.create({
        authorId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override,
    }, id);

    return questionsComment;
}

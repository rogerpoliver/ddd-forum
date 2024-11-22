import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts';
import { Question, QuestionProps } from '../../src/domain/forum/enterprise/entities/question.ts';

export function makeQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityID,
) {
    const question = Question.create({
        authorId: new UniqueEntityID(),
        bestAnswerId: new UniqueEntityID(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        ...override,
    }, id);

    return question;
}

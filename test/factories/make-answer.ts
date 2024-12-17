import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts';
import { Answer, AnswerProps } from '../../src/domain/forum/enterprise/entities/answer.ts';

export function makeAnswer(
    override: Partial<AnswerProps> = {},
    id?: UniqueEntityID,
) {
    const answer = Answer.create({
        authorId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override,
    }, id);

    return answer;
}

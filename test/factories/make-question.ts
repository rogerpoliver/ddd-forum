import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts';
import { Question, QuestionProps } from '../../src/domain/forum/enterprise/entities/question.ts';
import { Slug } from '../../src/domain/forum/enterprise/entities/value-objects/slug.ts';

export function makeQuestion(
    override: Partial<QuestionProps>,
) {
    const question = Question.create({
        authorId: new UniqueEntityID(),
        title: "Example question",
        slug: Slug.create("example-question"),
        content: "Example content",
        bestAnswerId: new UniqueEntityID(),
        ...override,
    });

    return question;
}

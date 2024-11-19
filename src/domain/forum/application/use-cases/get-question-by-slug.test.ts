import { assert } from '@std/assert/assert';

import {
    InMemoryQuestionsRepository
} from '../../../../../test/repositories/in-memory-questions-repository.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { Question } from '../../enterprise/entities/question.ts';
import { Slug } from '../../enterprise/entities/value-objects/slug.ts';
import { GetQuestionBySlugUseCase } from './get-question-by-slug.ts';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

Deno.test("Get Question By Slug", async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);

    const newQuestion = Question.create({
        authorId: new UniqueEntityID(),
        title: "Example Question",
        slug: Slug.create("example-question"),
        content: "Example content",
        bestAnswerId: new UniqueEntityID(),
    });
    await inMemoryQuestionsRepository.create(newQuestion);
    const { question } = await sut.execute({
        slug: "example-question",
    });
    assert(question.id);
    assert(question.title, newQuestion.title);
});

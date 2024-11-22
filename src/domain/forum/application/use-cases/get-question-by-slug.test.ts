import { assertEquals } from '@std/assert';

import { makeQuestion } from '../../../../../test/factories/make-question.ts';
import {
    InMemoryQuestionsRepository
} from '../../../../../test/repositories/in-memory-questions-repository.ts';
import { Slug } from '../../enterprise/entities/value-objects/slug.ts';
import { GetQuestionBySlugUseCase } from './get-question-by-slug.ts';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

Deno.test("Get Question By Slug", async (t) => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);

    await t.step("should be able to get a question by slug", async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create("example-question"),
        });

        await inMemoryQuestionsRepository.create(newQuestion);

        const { question } = await sut.execute({
            slug: "example-question",
        });

        assertEquals(question.id, newQuestion.id);
        assertEquals(question.title, newQuestion.title);
    });
});

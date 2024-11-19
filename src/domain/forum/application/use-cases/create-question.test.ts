import { assert } from '@std/assert/assert';

import { Question } from '../../enterprise/entities/question.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';
import { CreateQuestionUseCase } from './create-question.ts';

const fakeQuestionsRepository: QuestionsRepository = {
    create: async (_question: Question) => {},
    findBySlug: async (_slug: string) => null,
};

Deno.test("create a question", async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);
    const { question } = await createQuestion.execute({
        authorId: "1",
        title: "Nova pergunta",
        content: "Conteúdo da pergunta",
    });

    assert(question.id);
});

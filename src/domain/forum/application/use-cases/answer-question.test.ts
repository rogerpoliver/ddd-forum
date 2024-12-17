import { expect } from '@std/expect/expect';
import { beforeEach, describe, it } from '@std/testing/bdd';

import {
    InMemoryQuestionsRepository
} from '../../../../../test/repositories/in-memory-questions-repository.ts';
import { CreateQuestionUseCase } from './create-question.ts';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "New question",
      content: "Question content",
    });

    expect(result.question.authorId.toString()).toEqual("1");
    expect(result.question.title).toEqual("New question");
    expect(result.question.content).toEqual("Question content");
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.question,
    );
  });
});

import { PaginationParams } from "../../src/core/repositories/pagination-params.ts";
import {
  AnswerAttachmentsRepository,
} from "../../src/domain/forum/application/repositories/answer-attachments-repository.ts";
import {
  AnswersRepository,
} from "../../src/domain/forum/application/repositories/answers-repository.ts";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer.ts";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  create(answer: Answer): Promise<void> {
    this.items.push(answer);
    return Promise.resolve();
  }

  delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id == answer.id);
    this.items.splice(itemIndex, 1);

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());

    return Promise.resolve();
  }

  findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return Promise.resolve(null);
    }

    return Promise.resolve(answer);
  }

  findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((items) => items.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return Promise.resolve(answers);
  }

  save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id == answer.id);

    this.items[itemIndex] = answer;
    return Promise.resolve();
  }
}

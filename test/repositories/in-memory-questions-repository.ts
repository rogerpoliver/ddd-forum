import { DomainEvents } from "../../src/core/events/domain-events.ts";
import { PaginationParams } from "../../src/core/repositories/pagination-params.ts";
import {
  QuestionAttachmentsRepository,
} from "../../src/domain/forum/application/repositories/question-attachments-repository.ts";
import {
  QuestionsRepository,
} from "../../src/domain/forum/application/repositories/questions-repository.ts";
import { Question } from "../../src/domain/forum/enterprise/entities/question.ts";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  create(question: Question): Promise<void> {
    this.items.push(question);
    DomainEvents.dispatchEventsForAggregate(question.id);
    return Promise.resolve();
  }

  delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id == question.id);
    this.items.splice(itemIndex, 1);

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    );

    return Promise.resolve();
  }

  findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) {
      return Promise.resolve(null);
    }

    return Promise.resolve(question);
  }

  findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return Promise.resolve(null);
    }

    return Promise.resolve(question);
  }

  findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return Promise.resolve(questions);
  }

  save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id == question.id);
    this.items[itemIndex] = question;
    DomainEvents.dispatchEventsForAggregate(question.id);
    return Promise.resolve();
  }
}

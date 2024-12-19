import {
  AnswersRepository,
} from "../../src/domain/forum/application/repositories/answers-repository.ts";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer.ts";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  create(answer: Answer): Promise<void> {
    this.items.push(answer);
    return Promise.resolve();
  }

  delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id == answer.id);

    this.items.splice(itemIndex, 1);
    return Promise.resolve();
  }

  findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return Promise.resolve(null);
    }

    return Promise.resolve(answer);
  }

  save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id == answer.id);

    this.items[itemIndex] = answer;
    return Promise.resolve();
  }
}

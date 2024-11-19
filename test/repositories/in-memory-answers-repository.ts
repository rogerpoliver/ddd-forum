import {
    AnswersRepository
} from '../../src/domain/forum/application/repositories/answers-repositoriy.ts';
import { Answer } from '../../src/domain/forum/enterprise/entities/answer.ts';

export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = [];

    async create(answer: Answer) {
        this.items.push(answer);
    }
}

import {
    QuestionsRepository
} from '../../src/domain/forum/application/repositories/questions-repository.ts';
import { Question } from '../../src/domain/forum/enterprise/entities/question.ts';

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = [];

    create(question: Question): Promise<void> {
        this.items.push(question);
        return Promise.resolve();
    }

    delete(question: Question): Promise<void> {
        const itemIndex = this.items.findIndex((item) =>
            item.id == question.id
        );

        this.items.splice(itemIndex, 1);
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
}

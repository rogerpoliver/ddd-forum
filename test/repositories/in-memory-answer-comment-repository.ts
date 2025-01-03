import {
    AnswerCommentRepository
} from '../../src/domain/forum/application/repositories/answer-comments-repository.ts';
import { AnswerComment } from '../../src/domain/forum/enterprise/entities/answer-comment.ts';

export class InMemoryAnswerCommentRepository
    implements AnswerCommentRepository {
    public items: AnswerComment[] = [];

    create(answerComment: AnswerComment): Promise<void> {
        this.items.push(answerComment);
        return Promise.resolve();
    }

    delete(answerComment: AnswerComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) =>
            item.id == answerComment.id
        );

        this.items.splice(itemIndex, 1);
        return Promise.resolve();
    }

    findById(id: string): Promise<AnswerComment | null> {
        const answerComment = this.items.find((item) =>
            item.id.toString() === id
        );

        if (!answerComment) {
            return Promise.resolve(null);
        }

        return Promise.resolve(answerComment);
    }
}

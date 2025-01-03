import {
    QuestionCommentRepository
} from '../../src/domain/forum/application/repositories/question-comments-repository.ts';
import { QuestionComment } from '../../src/domain/forum/enterprise/entities/question-comment.ts';

export class InMemoryQuestionCommentRepository
    implements QuestionCommentRepository {
    public items: QuestionComment[] = [];

    create(questionComment: QuestionComment): Promise<void> {
        this.items.push(questionComment);
        return Promise.resolve();
    }

    delete(questionComment: QuestionComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) =>
            item.id == questionComment.id
        );

        this.items.splice(itemIndex, 1);
        return Promise.resolve();
    }

    findById(id: string): Promise<QuestionComment | null> {
        const questionComment = this.items.find((item) =>
            item.id.toString() === id
        );

        if (!questionComment) {
            return Promise.resolve(null);
        }

        return Promise.resolve(questionComment);
    }
}

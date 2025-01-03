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
}

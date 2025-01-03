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
}

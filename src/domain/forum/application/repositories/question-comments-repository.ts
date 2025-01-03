import { QuestionComment } from '../../enterprise/entities/question-comment.ts';

export interface QuestionCommentRepository {
    create(questionComment: QuestionComment): Promise<void>;
}

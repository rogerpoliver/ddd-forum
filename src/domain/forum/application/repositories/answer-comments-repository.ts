import { AnswerComment } from '../../enterprise/entities/answer-comment.ts';

export interface AnswerCommentRepository {
    create(answerComment: AnswerComment): Promise<void>;
}

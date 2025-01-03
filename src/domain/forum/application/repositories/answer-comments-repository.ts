import { AnswerComment } from '../../enterprise/entities/answer-comment.ts';

export interface AnswerCommentRepository {
    create(answerComment: AnswerComment): Promise<void>;
    delete(answerComment: AnswerComment): Promise<void>;
    findById(id: string): Promise<AnswerComment | null>;
}

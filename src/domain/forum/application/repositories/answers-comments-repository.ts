import { PaginationParams } from '../../../../core/repositories/pagination-params.ts';
import { AnswerComment } from '../../enterprise/entities/answer-comment.ts';

export interface AnswersCommentsRepository {
    create(answerComment: AnswerComment): Promise<void>;
    delete(answerComment: AnswerComment): Promise<void>;
    findById(id: string): Promise<AnswerComment | null>;
    findManyByAnswerId(
        questionId: string,
        params: PaginationParams,
    ): Promise<AnswerComment[]>;
}

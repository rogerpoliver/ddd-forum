import { PaginationParams } from '../../../../core/repositories/pagination-params.ts';
import { AnswersComment } from '../../enterprise/entities/answer-comment.ts';

export interface AnswersCommentsRepository {
    create(answersComment: AnswersComment): Promise<void>;
    delete(answersComment: AnswersComment): Promise<void>;
    findById(id: string): Promise<AnswersComment | null>;
    findManyByAnswerId(
        questionId: string,
        params: PaginationParams,
    ): Promise<AnswersComment[]>;
}

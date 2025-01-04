import { PaginationParams } from '../../../../core/repositories/pagination-params.ts';
import { QuestionsComment } from '../../enterprise/entities/question-comment.ts';

export interface QuestionsCommentsRepository {
    create(questionsComment: QuestionsComment): Promise<void>;
    delete(questionsComment: QuestionsComment): Promise<void>;
    findById(id: string): Promise<QuestionsComment | null>;
    findManyByQuestionId(
        questionId: string,
        params: PaginationParams,
    ): Promise<QuestionsComment[]>;
}

import { PaginationParams } from '../../../../core/repositories/pagination-params.ts';
import { QuestionComment } from '../../enterprise/entities/question-comment.ts';

export interface QuestionsCommentsRepository {
    create(questionComment: QuestionComment): Promise<void>;
    delete(questionComment: QuestionComment): Promise<void>;
    findById(id: string): Promise<QuestionComment | null>;
    findManyByQuestionId(
        questionId: string,
        params: PaginationParams,
    ): Promise<QuestionComment[]>;
}

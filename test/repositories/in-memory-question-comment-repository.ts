import { PaginationParams } from '../../src/core/repositories/pagination-params.ts';
import {
    QuestionsCommentsRepository
} from '../../src/domain/forum/application/repositories/questions-comments-repository.ts';
import { QuestionComment } from '../../src/domain/forum/enterprise/entities/question-comment.ts';

export class InMemoryQuestionCommentRepository
    implements QuestionsCommentsRepository {
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

    findManyByQuestionId(
        questionId: string,
        { page }: PaginationParams,
    ): Promise<QuestionComment[]> {
        const questionsComments = this.items
            .filter((items) => items.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20);

        return Promise.resolve(questionsComments);
    }
}

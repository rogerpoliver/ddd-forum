import { PaginationParams } from '../../src/core/repositories/pagination-params.ts';
import {
    QuestionsCommentsRepository
} from '../../src/domain/forum/application/repositories/questions-comments-repository.ts';
import { QuestionsComment } from '../../src/domain/forum/enterprise/entities/question-comment.ts';

export class InMemoryQuestionsCommentsRepository
    implements QuestionsCommentsRepository {
    public items: QuestionsComment[] = [];

    create(questionsComment: QuestionsComment): Promise<void> {
        this.items.push(questionsComment);
        return Promise.resolve();
    }

    delete(questionsComment: QuestionsComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) =>
            item.id == questionsComment.id
        );

        this.items.splice(itemIndex, 1);
        return Promise.resolve();
    }

    findById(id: string): Promise<QuestionsComment | null> {
        const questionsComment = this.items.find((item) =>
            item.id.toString() === id
        );

        if (!questionsComment) {
            return Promise.resolve(null);
        }

        return Promise.resolve(questionsComment);
    }

    findManyByQuestionId(
        questionId: string,
        { page }: PaginationParams,
    ): Promise<QuestionsComment[]> {
        const questionsComments = this.items
            .filter((items) => items.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20);

        return Promise.resolve(questionsComments);
    }
}

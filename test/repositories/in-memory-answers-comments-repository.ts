import { PaginationParams } from '../../src/core/repositories/pagination-params.ts';
import {
    AnswersCommentsRepository
} from '../../src/domain/forum/application/repositories/answers-comments-repository.ts';
import { AnswersComment } from '../../src/domain/forum/enterprise/entities/answer-comment.ts';

export class InMemoryAnswersCommentsRepository
    implements AnswersCommentsRepository {
    public items: AnswersComment[] = [];

    create(answersComment: AnswersComment): Promise<void> {
        this.items.push(answersComment);
        return Promise.resolve();
    }

    delete(answersComment: AnswersComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) =>
            item.id == answersComment.id
        );

        this.items.splice(itemIndex, 1);
        return Promise.resolve();
    }

    findById(id: string): Promise<AnswersComment | null> {
        const answersComment = this.items.find((item) =>
            item.id.toString() === id
        );

        if (!answersComment) {
            return Promise.resolve(null);
        }

        return Promise.resolve(answersComment);
    }

    findManyByAnswerId(
        answerId: string,
        { page }: PaginationParams,
    ): Promise<AnswersComment[]> {
        const answersComments = this.items
            .filter((items) => items.answerId.toString() === answerId)
            .slice((page - 1) * 20, page * 20);

        return Promise.resolve(answersComments);
    }
}

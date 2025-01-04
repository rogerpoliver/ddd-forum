import { AnswerComment } from '../../enterprise/entities/answer-comment.ts';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository.ts';

interface FetchAnswersCommentsUseCaseRequest {
    answerId: string;
    page: number;
}

interface FetchAnswersCommentsUseCaseResponse {
    answersComments: AnswerComment[];
}

export class FetchAnswersCommentsUseCase {
    constructor(
        private answersCommentRepository: AnswerCommentRepository,
    ) {}
    async execute(
        { answerId, page }: FetchAnswersCommentsUseCaseRequest,
    ): Promise<FetchAnswersCommentsUseCaseResponse> {
        const answersComments = await this.answersCommentRepository
            .findManyByAnswerId(
                answerId,
                {
                    page,
                },
            );

        return {
            answersComments,
        };
    }
}

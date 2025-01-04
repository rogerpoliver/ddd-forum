import { AnswerComment } from '../../enterprise/entities/answer-comment.ts';
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository.ts';

interface FetchAnswersCommentsUseCaseRequest {
    answerId: string;
    page: number;
}

interface FetchAnswersCommentsUseCaseResponse {
    answersComments: AnswerComment[];
}

export class FetchAnswersCommentsUseCase {
    constructor(
        private answersCommentsRepository: AnswersCommentsRepository,
    ) {}
    async execute(
        { answerId, page }: FetchAnswersCommentsUseCaseRequest,
    ): Promise<FetchAnswersCommentsUseCaseResponse> {
        const answersComments = await this.answersCommentsRepository
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

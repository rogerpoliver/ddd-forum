import { QuestionComment } from '../../enterprise/entities/question-comment.ts';
import { QuestionCommentRepository } from '../repositories/question-comments-repository.ts';

interface FetchQuestionsCommentsUseCaseRequest {
    questionId: string;
    page: number;
}

interface FetchQuestionsCommentsUseCaseResponse {
    questionsComments: QuestionComment[];
}

export class FetchQuestionsCommentsUseCase {
    constructor(
        private questionCommentRepository: QuestionCommentRepository,
    ) {}
    async execute(
        { questionId, page }: FetchQuestionsCommentsUseCaseRequest,
    ): Promise<FetchQuestionsCommentsUseCaseResponse> {
        const questionsComments = await this.questionCommentRepository
            .findManyByQuestionId(
                questionId,
                {
                    page,
                },
            );

        return {
            questionsComments,
        };
    }
}

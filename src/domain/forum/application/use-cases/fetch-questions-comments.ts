import { QuestionsComment } from '../../enterprise/entities/question-comment.ts';
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository.ts';

interface FetchQuestionsCommentsUseCaseRequest {
    questionId: string;
    page: number;
}

interface FetchQuestionsCommentsUseCaseResponse {
    questionsComments: QuestionsComment[];
}

export class FetchQuestionsCommentsUseCase {
    constructor(
        private questionsCommentsRepository: QuestionsCommentsRepository,
    ) {}
    async execute(
        { questionId, page }: FetchQuestionsCommentsUseCaseRequest,
    ): Promise<FetchQuestionsCommentsUseCaseResponse> {
        const questionsComments = await this.questionsCommentsRepository
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

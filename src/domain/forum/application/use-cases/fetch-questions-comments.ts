import { Either, right } from '../../../../core/either.ts';
import { QuestionsComment } from '../../enterprise/entities/question-comment.ts';
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository.ts';

interface FetchQuestionsCommentsUseCaseRequest {
    questionId: string;
    page: number;
}

type FetchQuestionsCommentsUseCaseResponse = Either<null, {
    questionsComments: QuestionsComment[];
}>;

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

        return right({
            questionsComments,
        });
    }
}

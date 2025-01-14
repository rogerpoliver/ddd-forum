import { Either, right } from '../../../../core/either.ts';
import { Answer } from '../../enterprise/entities/answer.ts';
import { AnswersRepository } from '../repositories/answers-repository.ts';

interface FetchQuestionsAnswersUseCaseRequest {
    questionId: string;
    page: number;
}

type FetchQuestionsAnswersUseCaseResponse = Either<null, {
    answers: Answer[];
}>;

export class FetchQuestionsAnswersUseCase {
    constructor(
        private answersRepository: AnswersRepository,
    ) {}
    async execute(
        { questionId, page }: FetchQuestionsAnswersUseCaseRequest,
    ): Promise<FetchQuestionsAnswersUseCaseResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(
            questionId,
            {
                page,
            },
        );

        return right({
            answers,
        });
    }
}

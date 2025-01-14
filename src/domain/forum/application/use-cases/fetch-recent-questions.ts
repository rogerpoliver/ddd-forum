import { Either, right } from '../../../../core/either.ts';
import { Question } from '../../enterprise/entities/question.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';

interface FetchRecentQuestionsUseCaseRequest {
    page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<null, {
    questions: Question[];
}>;

export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}
    async execute({
        page,
    }: FetchRecentQuestionsUseCaseRequest): Promise<
        FetchRecentQuestionsUseCaseResponse
    > {
        const questions = await this.questionsRepository.findManyRecent({
            page,
        });

        return right({
            questions,
        });
    }
}

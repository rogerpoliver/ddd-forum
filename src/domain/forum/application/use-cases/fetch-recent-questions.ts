import { Question } from '../../enterprise/entities/question.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';

interface FetchRecentQuestionsUseCaseRequest {
    page: number;
}

interface FetchRecentQuestionsUseCaseResponse {
    questions: Question[];
}

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

        return {
            questions,
        };
    }
}

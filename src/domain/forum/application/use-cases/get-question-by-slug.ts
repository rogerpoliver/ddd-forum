import { Either, left, right } from '../../../../core/either.ts';
import { Question } from '../../enterprise/entities/question.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

interface GetQuestionBySlugUseCaseRequest {
    slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, {
    question: Question;
}>;

export class GetQuestionBySlugUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}
    async execute({
        slug,
    }: GetQuestionBySlugUseCaseRequest): Promise<
        GetQuestionBySlugUseCaseResponse
    > {
        const question = await this.questionsRepository.findBySlug(slug);
        if (!question) {
            return left(new ResourceNotFoundError());
        }
        return right({
            question,
        });
    }
}

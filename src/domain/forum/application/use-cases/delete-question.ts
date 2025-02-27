import { Either, left, right } from '../../../../core/either.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';
import { NotAllowedError } from '../../../../core/errors/not-allowed-error.ts';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error.ts';

interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    null
>;
export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute(
        { authorId, questionId }: DeleteQuestionUseCaseRequest,
    ): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError());
        }

        await this.questionsRepository.delete(question);
        return right(null);
    }
}

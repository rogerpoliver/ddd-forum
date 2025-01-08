import { Either, left, right } from '../../../../core/either.ts';
import { AnswersRepository } from '../repositories/answers-repository.ts';
import { NotAllowedError } from './errors/not-allowed-error.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    null
>;

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute(
        { authorId, answerId }: DeleteAnswerUseCaseRequest,
    ): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError());
        }

        await this.answersRepository.delete(answer);
        return right(null);
    }
}

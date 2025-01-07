import { Either, left, right } from '../../../../core/either.ts';
import { AnswersRepository } from '../repositories/answers-repository.ts';

interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<string, null>;

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute(
        { authorId, answerId }: DeleteAnswerUseCaseRequest,
    ): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            return left("Answer not found.");
        }

        if (authorId !== answer.authorId.toString()) {
            return left("Permission denied");
        }

        await this.answersRepository.delete(answer);
        return right(null);
    }
}

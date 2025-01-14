import { Either, left, right } from '../../../../core/either.ts';
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository.ts';
import { NotAllowedError } from './errors/not-allowed-error.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    null
>;

export class DeleteAnswerCommentUseCase {
    constructor(private answersCommentsRepository: AnswersCommentsRepository) {}

    async execute(
        { authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest,
    ): Promise<DeleteAnswerCommentUseCaseResponse> {
        const answersComment = await this.answersCommentsRepository.findById(
            answerCommentId,
        );

        if (!answersComment) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== answersComment.authorId.toString()) {
            return left(new NotAllowedError());
        }

        await this.answersCommentsRepository.delete(answersComment);
        return right(null);
    }
}

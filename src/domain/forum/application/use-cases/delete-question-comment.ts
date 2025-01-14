import { Either, left, right } from '../../../../core/either.ts';
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository.ts';
import { NotAllowedError } from './errors/not-allowed-error.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    null
>;
export class DeleteQuestionCommentUseCase {
    constructor(
        private questionsCommentsRepository: QuestionsCommentsRepository,
    ) {}

    async execute(
        { authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest,
    ): Promise<DeleteQuestionCommentUseCaseResponse> {
        const questionsComment = await this.questionsCommentsRepository
            .findById(
                questionCommentId,
            );

        if (!questionsComment) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== questionsComment.authorId.toString()) {
            return left(new NotAllowedError());
        }

        await this.questionsCommentsRepository.delete(questionsComment);
        return right(null);
    }
}

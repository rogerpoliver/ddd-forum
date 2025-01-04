import { AnswersCommentsRepository } from '../repositories/answers-comments-repository.ts';

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
    constructor(private answersCommentsRepository: AnswersCommentsRepository) {}

    async execute(
        { authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest,
    ) {
        const answerComment = await this.answersCommentsRepository.findById(
            answerCommentId,
        );

        if (!answerComment) {
            throw new Error("Answer comment not found.");
        }

        if (authorId !== answerComment.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.answersCommentsRepository.delete(answerComment);
        return {};
    }
}

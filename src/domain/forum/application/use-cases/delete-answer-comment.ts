import { AnswerCommentRepository } from '../repositories/answer-comments-repository.ts';

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository) {}

    async execute(
        { authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest,
    ) {
        const answerComment = await this.answerCommentRepository.findById(
            answerCommentId,
        );

        if (!answerComment) {
            throw new Error("Answer comment not found.");
        }

        if (authorId !== answerComment.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.answerCommentRepository.delete(answerComment);
        return {};
    }
}

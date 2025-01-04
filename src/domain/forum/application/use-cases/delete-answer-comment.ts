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
        const answersComment = await this.answersCommentsRepository.findById(
            answerCommentId,
        );

        if (!answersComment) {
            throw new Error("Answer comment not found.");
        }

        if (authorId !== answersComment.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.answersCommentsRepository.delete(answersComment);
        return {};
    }
}

import { QuestionCommentRepository } from '../repositories/question-comments-repository.ts';

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) {}

    async execute(
        { authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest,
    ) {
        const questionComment = await this.questionCommentRepository.findById(
            questionCommentId,
        );

        if (!questionComment) {
            throw new Error("Question comment not found.");
        }

        if (authorId !== questionComment.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.questionCommentRepository.delete(questionComment);
        return {};
    }
}

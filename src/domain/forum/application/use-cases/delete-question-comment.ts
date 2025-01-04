import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository.ts';

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
    constructor(
        private questionsCommentsRepository: QuestionsCommentsRepository,
    ) {}

    async execute(
        { authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest,
    ) {
        const questionComment = await this.questionsCommentsRepository.findById(
            questionCommentId,
        );

        if (!questionComment) {
            throw new Error("Question comment not found.");
        }

        if (authorId !== questionComment.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.questionsCommentsRepository.delete(questionComment);
        return {};
    }
}

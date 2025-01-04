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
        const questionsComment = await this.questionsCommentsRepository
            .findById(
                questionCommentId,
            );

        if (!questionsComment) {
            throw new Error("Question comment not found.");
        }

        if (authorId !== questionsComment.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.questionsCommentsRepository.delete(questionsComment);
        return {};
    }
}

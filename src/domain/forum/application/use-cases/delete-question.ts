import { QuestionsRepository } from '../repositories/questions-repository.ts';

interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}

export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute(
        { authorId, questionId }: DeleteQuestionUseCaseRequest,
    ) {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            throw new Error("Question not found.");
        }

        if (authorId !== question.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.questionsRepository.delete(question);
        return {};
    }
}

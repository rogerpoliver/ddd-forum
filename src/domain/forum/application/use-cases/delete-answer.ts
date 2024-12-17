import { AnswersRepository } from '../repositories/answers-repository.ts';

interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute(
        { authorId, answerId }: DeleteAnswerUseCaseRequest,
    ) {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        await this.answersRepository.delete(answer);
        return {};
    }
}

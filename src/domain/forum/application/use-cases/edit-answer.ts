import { Answer } from "../../enterprise/entities/answer.ts";
import { AnswersRepository } from "../repositories/answers-repository.ts";

interface EditAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}

interface EditAnswerCaseRequest {
    answer: Answer;
}

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute(
        { authorId, answerId, content }: EditAnswerUseCaseRequest,
    ): Promise<EditAnswerCaseRequest> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        answer.content = content;

        await this.answersRepository.save(answer);
        return { answer };
    }
}

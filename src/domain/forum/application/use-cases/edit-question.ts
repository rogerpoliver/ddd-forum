import { Question } from "../../enterprise/entities/question.ts";
import { QuestionsRepository } from "../repositories/questions-repository.ts";

interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
}

interface EditQuestionCaseRequest {
    question: Question;
}

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute(
        { authorId, questionId, title, content }: EditQuestionUseCaseRequest,
    ): Promise<EditQuestionCaseRequest> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            throw new Error("Question not found.");
        }

        if (authorId !== question.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        question.title = title;
        question.content = content;

        await this.questionsRepository.save(question);
        return { question };
    }
}

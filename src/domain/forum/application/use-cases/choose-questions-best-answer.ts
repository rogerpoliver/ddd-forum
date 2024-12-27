import { Question } from "../../enterprise/entities/question.ts";
import { AnswersRepository } from "../repositories/answers-repository.ts";
import { QuestionsRepository } from "../repositories/questions-repository.ts";

interface ChooseQuestionsBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    questionId: string;
}

interface ChooseQuestionsBestAnswerUseCaseResponse {
    question: Question;
}

export class ChooseQuestionsBestAnswerUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private answersRepository: AnswersRepository,
    ) {}
    async execute(
        { answerId, authorId }: ChooseQuestionsBestAnswerUseCaseRequest,
    ): Promise<ChooseQuestionsBestAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found");
        }

        const question = await this.questionsRepository.findById(
            answer.questionId.toString(),
        );

        if (!question) {
            throw new Error("Question not found");
        }

        if (authorId !== question.authorId.toString()) {
            throw new Deno.errors.PermissionDenied();
        }

        question.bestAnswerId = answer.id;

        await this.questionsRepository.save(question);

        return {
            question,
        };
    }
}

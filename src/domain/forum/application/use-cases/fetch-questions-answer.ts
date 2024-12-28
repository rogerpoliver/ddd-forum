import { Answer } from "../../enterprise/entities/answer.ts";
import { AnswersRepository } from "../repositories/answers-repository.ts";

interface FetchQuestionsAnswersUseCaseRequest {
    questionId: string;
    page: number;
}

interface FetchQuestionsAnswersUseCaseResponse {
    answers: Answer[];
}

export class FetchQuestionsAnswersUseCase {
    constructor(
        private answersRepository: AnswersRepository,
    ) {}
    async execute(
        { questionId, page }: FetchQuestionsAnswersUseCaseRequest,
    ): Promise<FetchQuestionsAnswersUseCaseResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(
            questionId,
            {
                page,
            },
        );

        // const question = await this.questionsRepository.findById(
        //     answers[0].questionId.toString(),
        // );

        // if (!question) {
        //     throw new Error("Question not found");
        // }

        return {
            answers,
        };
    }
}

import { Answer } from '../entities/answer';

interface AnswerQuestionsUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionsUseCase {
    execute({ instructorId, questionId, content }: AnswerQuestionsUseCaseRequest) {
        const answer = new Answer(content)
        return answer
    }
}
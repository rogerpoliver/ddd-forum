import { Either, left, right } from '../../../../core/either.ts';
import { Question } from '../../enterprise/entities/question.ts';
import { AnswersRepository } from '../repositories/answers-repository.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';
import { NotAllowedError } from '../../../../core/errors/not-allowed-error.ts';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error.ts';

interface ChooseQuestionsBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    questionId: string;
}

type ChooseQuestionsBestAnswerUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question;
    }
>;

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
            return left(new NotAllowedError());
        }

        const question = await this.questionsRepository.findById(
            answer.questionId.toString(),
        );

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError());
        }

        question.bestAnswerId = answer.id;

        await this.questionsRepository.save(question);

        return right({ question });
    }
}

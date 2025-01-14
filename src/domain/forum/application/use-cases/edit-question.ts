import { Either, left, right } from '../../../../core/either.ts';
import { Question } from '../../enterprise/entities/question.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';
import { NotAllowedError } from './errors/not-allowed-error.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
}

type EditQuestionUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question;
    }
>;

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute(
        { authorId, questionId, title, content }: EditQuestionUseCaseRequest,
    ): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError());
        }

        question.title = title;
        question.content = content;

        await this.questionsRepository.save(question);
        return right({ question });
    }
}

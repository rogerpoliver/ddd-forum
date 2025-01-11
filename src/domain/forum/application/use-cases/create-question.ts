import { Either, right } from '../../../../core/either.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { Question } from '../../enterprise/entities/question.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';

interface CreateQuestionUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
}

type CreateQuestionUseCaseResponse = Either<null, {
    question: Question;
}>;

export class CreateQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute(
        { authorId, title, content }: CreateQuestionUseCaseRequest,
    ): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            bestAnswerId: new UniqueEntityID(),
            title,
            content,
        });

        await this.questionsRepository.create(question);

        return right({
            question,
        });
    }
}

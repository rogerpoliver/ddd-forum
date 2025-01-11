import { Either, left, right } from '../../../../core/either.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { QuestionsComment } from '../../enterprise/entities/question-comment.ts';
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

interface CommentOnQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, {
    questionsComment: QuestionsComment;
}>;

export class CommentOnQuestionUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private questionsCommentsRepository: QuestionsCommentsRepository,
    ) {}

    async execute(
        { authorId, questionId, content }: CommentOnQuestionUseCaseRequest,
    ): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        const questionsComment = QuestionsComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content,
        });

        await this.questionsCommentsRepository.create(
            questionsComment,
        );

        return right({
            questionsComment,
        });
    }
}

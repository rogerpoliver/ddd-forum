import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { AnswersComment } from '../../enterprise/entities/answer-comment.ts';
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository.ts';
import { AnswersRepository } from '../repositories/answers-repository.ts';

interface CommentOnAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}

interface CommentOnAnswerUseCaseResponse {
    answersComment: AnswersComment;
}

export class CommentOnAnswerUseCase {
    constructor(
        private answersRepository: AnswersRepository,
        private answersCommentsRepository: AnswersCommentsRepository,
    ) {}

    async execute(
        { authorId, answerId, content }: CommentOnAnswerUseCaseRequest,
    ): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        const answersComment = AnswersComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        });

        await this.answersCommentsRepository.create(
            answersComment,
        );

        return {
            answersComment,
        };
    }
}

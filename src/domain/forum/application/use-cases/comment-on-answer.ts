import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { AnswerComment } from '../../enterprise/entities/answer-comment.ts';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository.ts';
import { AnswersRepository } from '../repositories/answers-repository.ts';

interface CommentOnAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
    constructor(
        private answersRepository: AnswersRepository,
        private answerCommentRepository: AnswerCommentRepository,
    ) {}

    async execute(
        { authorId, answerId, content }: CommentOnAnswerUseCaseRequest,
    ): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        });

        await this.answerCommentRepository.create(
            answerComment,
        );

        return {
            answerComment,
        };
    }
}

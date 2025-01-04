import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { QuestionComment } from '../../enterprise/entities/question-comment.ts';
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository.ts';
import { QuestionsRepository } from '../repositories/questions-repository.ts';

interface CommentOnQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment;
}

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
            throw new Error("Question not found.");
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content,
        });

        await this.questionsCommentsRepository.create(
            questionComment,
        );

        return {
            questionComment,
        };
    }
}

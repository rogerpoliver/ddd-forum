import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { QuestionComment } from '../../enterprise/entities/question-comment.ts';
import { QuestionCommentRepository } from '../repositories/question-comments-repository.ts';
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
        private questionCommentRepository: QuestionCommentRepository,
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

        await this.questionCommentRepository.create(
            questionComment,
        );

        return {
            questionComment,
        };
    }
}

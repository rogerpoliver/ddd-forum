import { Either, left, right } from '../../../../core/either.ts';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts';
import { AnswersComment } from '../../enterprise/entities/answer-comment.ts';
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository.ts';
import { AnswersRepository } from '../repositories/answers-repository.ts';
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts';

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
  answersComment: AnswersComment;
}>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswersCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answersComment = AnswersComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answersComment);

    return right({
      answersComment,
    });
  }
}

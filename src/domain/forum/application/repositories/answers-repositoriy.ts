import type { Answer } from "../../enterprise/entities/answer.ts";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
}

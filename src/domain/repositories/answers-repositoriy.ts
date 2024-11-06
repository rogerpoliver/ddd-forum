import type { Answer } from "../entities/answer.ts";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
}

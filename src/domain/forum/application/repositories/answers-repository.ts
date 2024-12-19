import type { Answer } from "../../enterprise/entities/answer.ts";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  save(answer: Answer): Promise<void>;
}

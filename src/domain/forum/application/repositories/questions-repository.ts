import type { Question } from "../../enterprise/entities/question.ts";

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
}

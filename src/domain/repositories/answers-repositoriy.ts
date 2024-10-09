import type { Answer } from "../entities/answer";

export interface AnswersRepository {
	create(answer: Answer): Promise<void>;
}

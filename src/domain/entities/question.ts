import { Entity } from '../../core/entities/entity';

import type { UniqueEntityID } from "../../core/entities/unique-entity-id";

import type { Slug } from "./value-objects/slug";

interface QuestionProps {
	authorId: UniqueEntityID;
    bestAnswerId: UniqueEntityID;
	title: string;
	slug: Slug;
	content: string;
    createdAt: Date;
	updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
	get title() {
		return this.props.title;
	}

	get slug() {
		return this.props.slug;
	}

	get content() {
		return this.props.content;
	}

	get authorId() {
		return this.props.authorId;
	}
}

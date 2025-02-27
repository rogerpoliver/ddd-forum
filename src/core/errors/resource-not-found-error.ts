import { UseCaseError } from './user-case-error.ts';

export class ResourceNotFoundError extends Error implements UseCaseError {
    constructor() {
        super("Resource not found");
    }
}

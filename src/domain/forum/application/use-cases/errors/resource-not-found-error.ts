import { UseCaseError } from '../../../../../core/errors/user-case-error.ts';

export class ResourceNotFoundError extends Error implements UseCaseError {
    constructor() {
        super("Resource not found");
    }
}

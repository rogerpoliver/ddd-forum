import { UseCaseError } from '../../../../../core/errors/user-case-error.ts';

export class NotAllowedError extends Error implements UseCaseError {
    constructor() {
        super("Not allowed");
    }
}

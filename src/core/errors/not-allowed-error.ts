import { UseCaseError } from './user-case-error.ts';

export class NotAllowedError extends Error implements UseCaseError {
    constructor() {
        super("Not allowed");
    }
}

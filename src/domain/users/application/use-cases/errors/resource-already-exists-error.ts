import { UseCaseError } from '@/core/errors/use-case-errors';

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Resource "${identifier}" already exists.`);
  }
}

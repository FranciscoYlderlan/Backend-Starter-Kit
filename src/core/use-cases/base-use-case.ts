export interface UseCaseInput {
  [key: string]: never;
}
export interface UseCaseOutput {
  [key: string]: never;
}

export abstract class BaseUseCase<
  Input extends UseCaseInput,
  Output extends UseCaseOutput,
> {
  public abstract execute(params: Input): Promise<Output>;
}

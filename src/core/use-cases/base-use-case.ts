export abstract class BaseUseCase<Input, Output> {
  public abstract execute(params: Input): Promise<Output>;
}

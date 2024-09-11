export interface ValueObjectParams {}

export abstract class BaseValueObject<Params extends ValueObjectParams> {
  protected constructor(params: Params) {}

  public static transform<Input>(params: Input): BaseValueObject<Input> {
    throw new Error("Method 'transform' must be implemented in subclasses.");
  }
}

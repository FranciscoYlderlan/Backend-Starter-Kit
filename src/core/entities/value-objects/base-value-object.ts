export interface ValueObjectParams {
  [key: string]: never;
}

export abstract class BaseValueObject<Params extends ValueObjectParams> {
  protected constructor(params: Params) {}

  // Corrigido: Ajustando a assinatura do método estático transform
  public static transform<Params extends ValueObjectParams>(
    params: Params,
  ): BaseValueObject<Params> {
    throw new Error("Method 'transform' must be implemented in subclasses.");
  }
}

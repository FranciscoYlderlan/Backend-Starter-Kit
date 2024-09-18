export interface ValueObjectProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export abstract class BaseValueObject<Props extends ValueObjectProps> {
  protected constructor(public readonly value: Props) {}

  public static transform(
    props: ValueObjectProps,
  ): BaseValueObject<ValueObjectProps> {
    throw new Error("Method 'transform' must be implemented in subclasses.");
  }
}

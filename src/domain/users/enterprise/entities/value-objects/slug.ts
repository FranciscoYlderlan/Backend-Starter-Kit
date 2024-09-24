import {
  BaseValueObject,
  ValueObjectProps,
} from 'src/core/entities/value-objects/base-value-object';

interface SlugProps extends ValueObjectProps {
  value: string;
}

export class Slug extends BaseValueObject<SlugProps> {
  private constructor(slug: SlugProps) {
    super(slug);
  }

  public static transform(props: SlugProps): Slug {
    const slug = Slug.createSlug(props.value);
    return new Slug({ value: slug });
  }

  public toString(): string {
    return this.value.value;
  }

  private static createSlug(text: string): string {
    return text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/-+/g, '-'); // Remove consecutive hyphens
  }
}

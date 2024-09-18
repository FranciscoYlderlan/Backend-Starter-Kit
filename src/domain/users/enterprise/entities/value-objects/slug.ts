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

  public static transform<SlugProps extends ValueObjectProps>(
    props: SlugProps,
  ): Slug {
    const slug = Slug.createSlug(props.value);
    return new Slug({ value: slug });
  }

  private static createSlug(text: string): string {
    return text
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/-+/g, '-'); // Remove hífens consecutivos
  }
}

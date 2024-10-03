import { BaseEntity } from 'src/core/entities/base-entity';
import { Optional } from 'src/core/types/optional';
import { Slug } from './value-objects/slug';
import { UniqueID } from './value-objects/unique-id';
export interface UserProps {
  id: UniqueID;
  name: string;
  slug: Slug;
  email: string;
  avatar?: string | null;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt' | 'slug' | 'id'>) {
    const user = new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      slug: Slug.transform({ value: props.name }),
      id: props.id,
    });

    return user;
  }

  public update(
    props: Partial<Omit<UserProps, 'id' | 'slug' | 'createdAt' | 'updatedAt'>>,
  ): void {
    Object.assign(this.props, {
      ...props,
      name: props.name ?? this.props.name,
      slug: props.name
        ? Slug.transform({ value: props.name })
        : this.props.slug,
    });
    // if (props.name) {
    //   this.props.name = props.name;
    //   this.props.slug = Slug.transform({ value: props.name });
    // }

    // if (props.email) this.props.email = props.email;

    // if (props.avatar) this.props.avatar = props.avatar;

    // if (props.password) this.props.password = props.password;

    this.touch();
  }

  public getName(): string {
    return this.props.name;
  }

  public getSlug(): Slug {
    return this.props.slug;
  }

  public getEmail(): string {
    return this.props.email;
  }

  public getPassword(): string {
    return this.props.password;
  }

  public getAvatar(): string | undefined | null {
    return this.props.avatar;
  }
  public getCreatedAt(): Date {
    return this.props.createdAt;
  }
  public getUpdatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
  private touch(): void {
    this.props.updatedAt = new Date();
  }
}

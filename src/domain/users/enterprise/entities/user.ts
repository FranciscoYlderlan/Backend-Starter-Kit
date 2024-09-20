import { BaseEntity } from 'src/core/entities/base-entity';
import { Optional } from 'src/core/types/optional';
import { Slug } from './value-objects/slug';
import { UniqueID } from './value-objects/unique-id';
export interface UserProps {
  name: string;
  slug: Slug;
  email: string;
  avatar?: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity<UserProps> {
  static create(
    props: Optional<UserProps, 'createdAt' | 'slug'>,
    id?: UniqueID,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
        slug: Slug.transform({ value: props.name }),
      },
      id,
    );
    return user;
  }

  public getName(): string {
    return this.props.name;
  }

  public getSlug(): string {
    return this.props.slug.value.value;
  }

  public getEmail(): string {
    return this.props.email;
  }

  public getPassword(): string {
    return this.props.password;
  }

  public getAvatar(): string | undefined {
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

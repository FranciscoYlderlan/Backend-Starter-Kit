import { BaseEntity } from 'src/core/entities/base-entity';
export interface UserProps {
  name: string;
  email: string;
  avatar?: string;
  password: string;
}

export class User extends BaseEntity<UserProps> {
  public getName(): string {
    return this.props.name;
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
}

import { User, UserProps } from '@/domain/users/enterprise/entities/user';

export class UserPresenter {
  static toHttp(user: User) {
    return {
      id: user.getId().toString(),
      name: user.getName(),
      slug: user.getSlug().toString(),
      avatar: user.getAvatar(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}

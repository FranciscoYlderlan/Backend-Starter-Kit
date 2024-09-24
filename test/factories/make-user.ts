import { User, UserProps } from '@/domain/users/enterprise/entities/user';

export function makeUser(override: Partial<UserProps> = {}): UserProps {
  const user = User.create({
    name: 'Name example',
    password: 'password-example',
    email: 'email@example',
    ...override,
  });
  return {
    id: user.getId(),
    name: user.getName(),
    createdAt: user.getCreatedAt(),
    email: user.getEmail(),
    avatar: user.getAvatar(),
    password: user.getPassword(),
    slug: user.getSlug(),
    updatedAt: user.getUpdatedAt(),
  };
}

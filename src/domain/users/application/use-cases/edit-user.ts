import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { UserRepository } from '../repositories/user-repository';

export interface EditUserInput {
  id: UniqueID;
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
}

export interface EditUserOutput {
  success: boolean;
}
export class EditUserUseCase extends BaseUseCase<
  EditUserInput,
  EditUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: EditUserInput): Promise<EditUserOutput> {
    const { id, email, name, password, avatar } = params;

    const user = await this.userRepository.findByProperty({ id });

    if (!user.item) throw new Error('User not found.');
    console.log('entrei');
    const status = await this.userRepository.update({
      id,
      data: { name, email, avatar, password },
    });

    return status;
  }
}

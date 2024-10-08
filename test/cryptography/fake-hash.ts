import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/users/application/cryptography/hash-generator';

export class FakeHash implements HashGenerator, HashComparer {
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }
}

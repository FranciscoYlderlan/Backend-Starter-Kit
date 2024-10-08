import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/users/application/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptHash implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}

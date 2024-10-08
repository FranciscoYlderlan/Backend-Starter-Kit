import { Encryptor } from '@/domain/users/application/cryptography/encryptor';
import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/users/application/cryptography/hash-generator';
import { Module } from '@nestjs/common';
import { BcryptHash } from './bcrypt-hash';
import { JwtEncryptor } from './jwt-encryptor';

@Module({
  providers: [
    { provide: Encryptor, useClass: JwtEncryptor },
    { provide: HashGenerator, useClass: BcryptHash },
    { provide: HashComparer, useClass: BcryptHash },
  ],
  exports: [Encryptor, HashGenerator, HashComparer],
})
export class CryptographyModule {}

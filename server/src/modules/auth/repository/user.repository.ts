import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/auth.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    email: string,
    fullName: string,
    googleId?: string,
    password?: string,
  ) {
    const user = this.create({ email, password, googleId, fullName });
    return this.save(user);
  }

  async findByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.findOne({
      where: { id },
    });
  }

  async linkGoogleAccount(userId: number, googleId: string) {
    await this.update(userId, { googleId });
  }
}

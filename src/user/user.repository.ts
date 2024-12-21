import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  async findByName(name: string): Promise<User[]> {
    return this.find({
      where: { m_name: name },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, updatedUser: User): Promise<User | null> {
    const result = await this.userRepository.update(id, updatedUser);
    if (result.affected === 0) return null;
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return !!result.affected && result.affected > 0;
  }
}
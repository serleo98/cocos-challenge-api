import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}
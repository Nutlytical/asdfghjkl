import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto/user.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(payload: CreateUserDto): Promise<ResponseUserDto> {
    const { username, email, password } = payload;

    // const isUsernameExists = this.findOneByUsername(username);

    // if (isUsernameExists) {
    //   throw new HttpException(
    //     'Username already exists, please try again.',
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }

    const isEmailExists = await this.usersRepository.findOne({
      email,
    });

    if (isEmailExists) {
      throw new HttpException(
        'Email already exists, please sign in instead.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const hashedPassword = encodePassword(password);

    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email'])
      .where('user.email = :email', { email: payload.email })
      .getOne();
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email', 'user.password'])
      .where('user.username = :username', { username })
      .getOne();
  }

  findAllUser(): Promise<ResponseUserDto[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email', 'user.password'])
      .getMany();
  }

  findOneUser(userId: number): Promise<ResponseUserDto> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email'])
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async updateUser(
    userId: number,
    payload: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    await this.usersRepository.update(userId, payload);

    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email'])
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async deleteUser(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}

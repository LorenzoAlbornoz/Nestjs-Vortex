import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepositoyry: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepositoyry.create(createUserDto);
    return await this.userRepositoyry.save(newUser);
  }

  async findAll() {
    return await this.userRepositoyry.find({});
  }

  async findOne(id: number) {
    const user = await this.userRepositoyry.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not foud`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepositoyry.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.userRepositoyry.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepositoyry.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepositoyry.remove(user);
  }
}

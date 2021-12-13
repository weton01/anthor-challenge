import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto) : Promise<UserEntity> {
    let tempUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(tempUser);
  }

  async findOne(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({email})
  }
}

import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  @Post('/signup')
  async signup(
    @Body() createUserDto: CreateUserDto
  ) {
    try{
      const userExists = await this.usersService.findOne(createUserDto.email)
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10)

      if (userExists) {
        const strErr = 'e-mail already exists'
        throw new HttpException(strErr, HttpStatus.CONFLICT);
      }

      const user = await this.usersService.create(createUserDto);
      const token = await this.jwtService.sign({ email: user.email, id: user.id })
  
      return {user, token}
    } catch (err) { 
      throw new HttpException(err.response, err.status);
    }
  }

  @Post('/signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    try{
      const user = await this.usersService.findOne(createUserDto.email)
  
      if (!user) {
        const strErr = 'invalid credentials'
        throw new HttpException(strErr, HttpStatus.UNAUTHORIZED);
      }

      const isMatch = await bcrypt.compare(createUserDto.password, user.password)
      if (!isMatch) {
        const strErr = 'invalid credentials'
        throw new HttpException(strErr, HttpStatus.UNAUTHORIZED);
      }

      const token = await this.jwtService.sign({ email: user.email, id: user.id })
      delete user.password

      return {user, token}
    } catch (err) { 
      throw new HttpException(err.response, err.status);
    }
  }
}

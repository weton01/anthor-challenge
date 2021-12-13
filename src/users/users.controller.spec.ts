import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtConstants } from '../utils/constants';
import { JwtStrategy } from '../utils/passport/jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

const userEntity = new UserEntity({ id: '1', email: 'any_email', password: 'any_password' })

describe('UsersController', () => {
  let sutJwt: JwtService;
  let sutController: UsersController;
  let sutService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: jwtConstants.secret,
        }),],
      providers: [{
        provide: UsersService,
        useValue: {
          create: jest.fn().mockResolvedValue(userEntity),
          findOne: jest.fn(),
          update: jest.fn(),
        }
      },
      {
        provide: JwtStrategy,
        useValue: {  }
      },
      {
        provide: JwtService,
        useValue: {
          sign: jest.fn().mockResolvedValue('token')
        }
      }
      ],
    }).compile();

    sutJwt = module.get<JwtService>(JwtService)
    sutController = module.get<UsersController>(UsersController)
    sutService = module.get<UsersService>(UsersService)
  });

  it('should be defined', () => {
    expect(sutController).toBeDefined();
    expect(sutService).toBeDefined();
  });

  describe('signup', () => {
    it('should return a user entity successfully', async () => {

      const body: CreateUserDto = {
        email: 'any_email@mail.com',
        password: 'any_password'
      }

      const result = await sutController.signup(body);
      
      expect(result).toEqual({
        user: userEntity,
        token: 'token'
      })
    })

    
    it('should throw if e-mail already exists', async () => {
      const body: CreateUserDto = {
        email: 'any_email@mail.com',
        password: 'any_password'
      }

      jest.spyOn(sutService, 'findOne').mockResolvedValue(undefined);

      expect(sutController.signup(body)).rejects.toThrowError();
    })

    
    it('should throw if an exception', () => {
      // Arrange
      const body: CreateUserDto = {
        email: 'any_email@mail.com',
        password: 'any_password'
      };

      jest.spyOn(sutService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(sutController.signup(body)).rejects.toThrowError();
    });

    describe('signin', () => {
      it('should return a user entity and token if successfully', async () => {
        jest.spyOn(sutService, 'findOne').mockResolvedValue(userEntity);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        const body: CreateUserDto = {
          email: 'any_email@mail.com',
          password: 'any_password'
        }
  
        const result = await sutController.signin(body);
        
        expect(result).toEqual({
          user: userEntity,
          token: 'token'
        })
      })

      it('should throws if invalid password', async () => {
        jest.spyOn(sutService, 'findOne').mockResolvedValue(userEntity);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

        const body: CreateUserDto = {
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        
        expect(sutController.signin(body)).rejects.toThrowError();
      })

      it('should throws if e-mail not found', async () => {
        jest.spyOn(sutService, 'findOne').mockResolvedValue(undefined);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        const body: CreateUserDto = {
          email: 'any_email@mail.com',
          password: 'any_password'
        }
          
        expect(sutController.signin(body)).rejects.toThrowError();
      })
    });
    /*
    */
  });
});

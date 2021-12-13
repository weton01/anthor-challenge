import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

const userEntity = new UserEntity({ id: '1', email: 'any_email', password: 'any_password' })

describe('UsersController', () => {
  let sutService: UsersService;
  let sutRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntity),
            create: jest.fn().mockResolvedValue(userEntity),
            save: jest.fn().mockResolvedValue(userEntity),
          },
        },
      ],
    }).compile();

    sutService = module.get<UsersService>(UsersService)
    sutRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(sutRepository).toBeDefined();
    expect(sutService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user entity successfully', async () => {
      const result = await sutService.findOne('any_email');
      expect(result).toEqual(userEntity);
    })

    it('should throw if an exception', async () => {
      jest.spyOn(sutRepository, 'findOne').mockRejectedValueOnce(new Error());
      expect(sutService.findOne('any_email')).rejects.toThrowError();
    })
  });

  describe('create', () => {
    it('should return a user entity successfully', async () => {
      const body: CreateUserDto = {
        email: 'any_email@mail.com',
        password: 'any_password'
      };

      const result = await sutService.create(body);
      expect(result).toEqual(userEntity);
    })

    it('should throw if an exception', async () => {
      const body: CreateUserDto = {
        email: 'any_email@mail.com',
        password: 'any_password'
      };

      jest.spyOn(sutRepository, 'save').mockRejectedValueOnce(new Error());
      expect(sutService.create(body)).rejects.toThrowError();
    })
    /*
    */
  });
});

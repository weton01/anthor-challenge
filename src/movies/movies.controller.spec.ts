import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';


const movieEntitys = [
  new MovieEntity({
    id: '1',
    name: 'rambo',
    releaseDate: new Date('2020-01-01')
  }),
  new MovieEntity({
    id: '2',
    name: 'stalone',
    releaseDate: new Date('2020-01-01')
  }),
]

describe('MoviesController', () => {
  let sutController: MoviesController;
  let sutService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: MoviesService,
          useValue: {
            create: jest.fn().mockResolvedValue(movieEntitys[0]),
            findOne: jest.fn().mockResolvedValue(movieEntitys[0]),
            findAll: jest.fn().mockResolvedValue(movieEntitys),
            update: jest.fn().mockResolvedValue(movieEntitys[0]),
            findByName: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue('success to remove movie')
          }
        }
      ],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ]
    }).compile();

    sutService = module.get<MoviesService>(MoviesService);
    sutController = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(sutController).toBeDefined();
  });

  describe('create', () => {
    it('should return a movie entity if successfully create', async () => {
      const body: CreateMovieDto = {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date()
      }

      const result = await sutController.create(body);

      expect(result).toEqual(movieEntitys[0])
    })

    it('should throws if name already created', async () => {
      jest.spyOn(sutService, 'findByName').mockResolvedValue(movieEntitys[0])
      jest.spyOn(sutService, 'create').mockResolvedValue(movieEntitys[0]);

      const body: CreateMovieDto = {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date()
      }

      expect(sutController.create(body)).rejects.toThrowError();
    })

    it('should throws if an exception', async () => {
      jest.spyOn(sutService, 'findByName').mockRejectedValueOnce(new Error());

      const body: CreateMovieDto = {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date()
      }

      expect(sutController.create(body)).rejects.toThrowError();
    })
  });

  describe('findAll', () => {
    it('should return a movie entity list ', async () => {
      const result = await sutController.findAll();

      expect(result).toEqual(movieEntitys)
    })

    
    it('should throws if an exception', async () => {
      jest.spyOn(sutService, 'findAll').mockRejectedValueOnce(new Error());

      expect(sutController.findAll()).rejects.toThrowError();
    })
  });

  describe('findOne', () => {
    it('should return a movie entity', async () => {
      const result = await sutController.findOne('any_id');

      expect(result).toEqual(movieEntitys[0])
    })

    it('should throws if id not exists', async () => {
      jest.spyOn(sutService, 'findOne').mockResolvedValue(undefined);

      expect(sutController.findOne('any_id')).rejects.toThrowError();
    })
    
    it('should throws if an exception', async () => {
      jest.spyOn(sutService, 'findOne').mockRejectedValueOnce(new Error());

      expect(sutController.findOne('any_id')).rejects.toThrowError();
    })
  });

  describe('update', () => {
    it('should return a movie entity updated', async () => {
      const body: CreateMovieDto = {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date()
      }

      const result = await sutController.update('any_id', body);

      expect(result).toEqual(movieEntitys[0])
    })

    it('should throws if id not exists', async () => {
      jest.spyOn(sutService, 'findOne').mockResolvedValue(undefined);

      const body: CreateMovieDto = {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date()
      }

      expect(sutController.update('any_id', body)).rejects.toThrowError();
    })
 
    it('should throws if an exception', async () => {
      jest.spyOn(sutService, 'update').mockRejectedValueOnce(new Error());
      const body: CreateMovieDto = {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date()
      }
      expect(sutController.update('any_id', body)).rejects.toThrowError();
    })
  });

  describe('remove', () => {
    it('should return a message if removed', async () => {
      const result = await sutController.remove('any_id' );

      expect(result).toEqual('success to remove movie')
    })

    it('should throws if id not exists', async () => {
      jest.spyOn(sutService, 'findOne').mockResolvedValue(undefined);

      const body: CreateMovieDto = {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date()
      }

      expect(sutController.remove('any_id')).rejects.toThrowError();
    })
  });
});

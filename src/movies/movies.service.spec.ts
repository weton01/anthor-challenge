import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieEntity } from './entities/movie.entity';
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

describe('MoviesService', () => {
  let sutService: MoviesService;
  let sutRepository: Repository<MovieEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(movieEntitys[0]),
            find: jest.fn().mockResolvedValue(movieEntitys),
            findOne: jest.fn().mockResolvedValue(movieEntitys[0]),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue('success to remove movie'),
            save: jest.fn().mockResolvedValue(movieEntitys[0]),
          },
        },
      ],
    }).compile();

    sutService = module.get<MoviesService>(MoviesService);
    sutRepository = module.get<Repository<MovieEntity>>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(sutService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return movies if successfully', async () => {
      const result = await sutService.findAll();
      expect(result).toEqual(movieEntitys);
    })

    it('should throw if an exception', async () => {
      jest.spyOn(sutRepository, 'find').mockRejectedValueOnce(new Error());
      expect(sutService.findAll()).rejects.toThrowError();
    })
  });

  describe('findOne', () => {
    it('should return a movie successfully', async () => {
      const result = await sutService.findOne('qweqw');
      expect(result).toEqual(movieEntitys[0]);
    })
   
    it('should throw if an exception', async () => {
      jest.spyOn(sutRepository, 'findOne').mockRejectedValueOnce(new Error());
      expect(sutService.findOne('qweqw')).rejects.toThrowError();
    })
  });

  describe('findByName', () => {
    it('should return a movie successfully', async () => {
      const result = await sutService.findByName('qweqw');
      expect(result).toEqual(movieEntitys[0]);
    })
   
    it('should throw if an exception', async () => {
      jest.spyOn(sutRepository, 'findOne').mockRejectedValueOnce(new Error());
      expect(sutService.findByName('qweqw')).rejects.toThrowError();
    })
  });

  describe('update', () => {
    it('should return a movie if successfully and update', async () => {
      const movie: CreateMovieDto =  {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date('2001-01-01')
      }

      const result = await sutService.update('any_id', movie);

      expect(result).toEqual(movieEntitys[0]);
    })
   
    it('should throw if an exception', async () => {
      const movie: CreateMovieDto =  {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date('2001-01-01')
      }

      jest.spyOn(sutRepository, 'update').mockRejectedValueOnce(new Error());
      expect(sutService.update('any_id', movie)).rejects.toThrowError();
    })
  });

  describe('updateRate', () => {
    it('should return a movie if successfully and update rate of movie', async () => {
      const result = await sutService.updateRate('any_id', 10);

      expect(result).toEqual(movieEntitys[0]);
    })
   
    it('should throw if an exception', async () => {
      jest.spyOn(sutRepository, 'update').mockRejectedValueOnce(new Error());

      expect(sutService.updateRate('any_id', 10)).rejects.toThrowError();
    })
  });

  describe('remove', () => {
    it('should return a success message if delete movie', async () => {
      const result = await sutService.remove('any_id');

      expect(result).toEqual('success to remove movie');
    })
   
    it('should throw if an exception', async () => {
      jest.spyOn(sutRepository, 'delete').mockRejectedValueOnce(new Error());

      expect(sutService.remove('any_id')).rejects.toThrowError();
    })
  });

  describe('create ', () => {
    it('should return a movie if successfully create', async () => {
      const movie: CreateMovieDto =  {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date('2001-01-01')
      }

      const result = await sutService.create(movie);

      expect(result).toEqual(movieEntitys[0]);
    })
   
    it('should throw if an exception', async () => {
      const movie: CreateMovieDto =  {
        name: 'any_name',
        rate: 0,
        releaseDate: new Date('2001-01-01')
      }

      jest.spyOn(sutRepository, 'save').mockRejectedValueOnce(new Error());

      expect(sutService.create(movie)).rejects.toThrowError();
    })
  });
});

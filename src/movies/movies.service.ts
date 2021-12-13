import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>,
  ) { }

  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    createMovieDto.rate = 0;
    const tempMovie = this.movieRepository.create(createMovieDto)
    
    return await this.movieRepository.save(tempMovie)
  }

  async findAll(): Promise<any[]> {
    return await this.movieRepository.find({ relations: ["reviews", "reviews.comments"] })
  }

  async findOne(id: string): Promise<MovieEntity> {
    return await this.movieRepository.findOne({id})
  }

  async findByName(name: string): Promise<MovieEntity> {
    return await this.movieRepository.findOne({name})
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<any> {
    await this.movieRepository.update(id, updateMovieDto);
    return await this.movieRepository.findOne({id}) 
  }

  async updateRate(id: string, rate: number) {
     
    await this.movieRepository.update(id, {rate});
    return await this.movieRepository.findOne({id}) 
  }

  async remove(id: string): Promise<string> {
    await this.movieRepository.delete(id);
    return 'success to remove movie'
  }

}

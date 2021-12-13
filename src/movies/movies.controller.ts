import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post('/')
  async create(@Body() createMovieDto: CreateMovieDto) {
    const movieExists = await this.moviesService.findByName(createMovieDto.name)

    if (movieExists) {
      const strErr = 'movie name already exists'
      throw new HttpException(strErr, HttpStatus.CONFLICT);
    }

    return await this.moviesService.create(createMovieDto)
  }

  @Get('/')
  async findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userExists = await this.moviesService.findOne(id)

    if (!userExists) {
      const strErr = 'movie not found'
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    const userExists = await this.moviesService.findOne(id)

    if (!userExists) {
      const strErr = 'movie not found'
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userExists = await this.moviesService.findOne(id)

    if (!userExists) {
      const strErr = 'movie not found'
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    return this.moviesService.remove(id);
  }
}

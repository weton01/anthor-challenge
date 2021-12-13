import { Controller, Post, Body, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../utils/passport/jwt-auth.guard';
import { MoviesService } from 'src/movies/movies.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly moviesService: MoviesService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async create(@Param('id') id, @Req() request, @Body() createReviewDto: CreateReviewDto) {
    const movie = await this.moviesService.findOne(id)
    
    if (!movie) {
      const strErr = 'movie not found'
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    createReviewDto.userId = request.user.userId
    createReviewDto.movie = movie

    const review = await this.reviewsService.create(createReviewDto);
    const {cnt, sm} = await this.reviewsService.findGrouped(id);
    
    this.moviesService.updateRate(id, sm / cnt)

    return review
  }
}

import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { PassportModule } from '@nestjs/passport';
import { MoviesService } from '../movies/movies.service';
import { MovieEntity } from '../movies/entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, MovieEntity]),
    PassportModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService,MoviesService]
})
export class ReviewsModule {}

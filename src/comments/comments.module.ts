import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ReviewsService } from '../reviews/reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '../reviews/entities/review.entity';
import { PassportModule } from '@nestjs/passport';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, CommentEntity]),
    PassportModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, ReviewsService]
})
export class CommentsModule { }

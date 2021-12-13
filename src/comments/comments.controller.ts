import { Controller, Post, Body, Param, Req, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { ReviewsService } from '../reviews/reviews.service';
import { JwtAuthGuard } from '../utils/passport/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async create(@Param('id') id, @Req() request, @Body() createCommentDto: CreateCommentDto) {
    const review = await this.reviewsService.findOne(id)
        
    if (!review) {
      const strErr = 'movie not found'
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    createCommentDto.userId = request.user.userId
    createCommentDto.review = review

    return this.commentsService.create(createCommentDto);
  }
}

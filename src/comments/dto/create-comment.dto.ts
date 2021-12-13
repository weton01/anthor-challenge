import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ReviewEntity } from '../../reviews/entities/review.entity';

export class CreateCommentDto {
  @IsOptional()
  @ApiProperty()
  review: ReviewEntity

  @IsOptional()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

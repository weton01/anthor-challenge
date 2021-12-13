import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { MovieEntity } from 'src/movies/entities/movie.entity';

export class CreateReviewDto {
  @IsOptional()
  @ApiProperty()
  movie: MovieEntity

  @IsOptional()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;
 
  @IsNotEmpty()
  @ApiProperty()
  @Min(0)
  @Max(5)
  rate: number;
}

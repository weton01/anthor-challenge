import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @ApiProperty()
  rate: number;
  
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  releaseDate: Date;
}

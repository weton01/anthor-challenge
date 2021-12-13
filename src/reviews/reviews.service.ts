import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './entities/review.entity';

export interface GroupedResponse {
  cnt : number
  sm: number
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
  ) { }

  async create(createReviewDto: CreateReviewDto) {
    const tempReview = this.reviewRepository.create(createReviewDto)
    return await this.reviewRepository.save(tempReview)
  }

  async findGrouped(id: string)  {
    const response: GroupedResponse[] = await this.reviewRepository.query(`
      SELECT COUNT(rate) as cnt, SUM(rate) as sm FROM reviews WHERE movieId = '${id}'
    `)

    if(response.length > 0){
      return response[0]
    }

    return undefined
  }

  async findOne(id: string) { 
    return await this.reviewRepository.findOne({id})
  }
}

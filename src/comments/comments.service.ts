import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  
  constructor(
    @InjectRepository(CommentEntity) private readonly movieRepository: Repository<CommentEntity>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const tempComment = this.movieRepository.create(createCommentDto)

    return await this.movieRepository.save(tempComment)
  }
}

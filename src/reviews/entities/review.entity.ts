import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from '../../comments/entities/comment.entity';
import { MovieEntity } from '../../movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  description: string;
  
  @Column()
  @ApiProperty()
  rate: number;

  @Column()
  @ApiProperty()
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;

  @ManyToOne(type => MovieEntity )
  @JoinColumn({name: 'movieId'})
  movie: MovieEntity;

  @OneToMany(type => CommentEntity, comment => comment.review)
  comments: CommentEntity[];

  constructor(entity?: Partial<ReviewEntity>) {
    this.id = entity?.id;
    this.description = entity?.description;
    this.rate = entity?.rate;
    this.movie = entity?.movie;
    this.comments = entity?.comments;
    this.createdAt = entity?.createdAt;
    this.updatedAt = entity?.updatedAt;
    this.deletedAt = entity?.deletedAt;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from '../../reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  name: string;
  
  @Column()
  @ApiProperty()
  rate: number;

  @Column({ type: 'date' })
  @ApiProperty()
  releaseDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;

  @OneToMany(type => ReviewEntity, review => review.movie)
  reviews: ReviewEntity[];

  constructor(movie?: Partial<MovieEntity>) {
    this.id = movie?.id;
    this.name = movie?.name;
    this.rate = movie?.rate;
    this.releaseDate = movie?.releaseDate;
    this.createdAt = movie?.createdAt;
    this.updatedAt = movie?.updatedAt;
    this.deletedAt = movie?.deletedAt;
  }

}

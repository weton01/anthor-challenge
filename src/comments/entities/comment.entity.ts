import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from '../../reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  description: string;

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
 
  @ManyToOne(type => ReviewEntity )
  @JoinColumn({name: 'entityId'})
  review: ReviewEntity;

  constructor(user?: Partial<CommentEntity>) {
    this.id = user?.id;
    this.description = user?.description;
    this.description = user?.description;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.deletedAt = user?.deletedAt;
  }
}

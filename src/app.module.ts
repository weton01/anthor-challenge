import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { MovieEntity } from './movies/entities/movie.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewEntity } from './reviews/entities/review.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/entities/comment.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'anthor',
      synchronize: true,
      entities: [UserEntity, MovieEntity, ReviewEntity, CommentEntity]
    }),
    MoviesModule,
    ReviewsModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
@Module({
  imports: [AuthModule, UsersModule, PostsModule, CommentsModule, ReactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

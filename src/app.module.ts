import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [AuthModule, UsersModule, PostsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

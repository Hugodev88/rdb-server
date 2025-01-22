import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { QueueModule } from './queue/queue.module';
import { MatchModule } from './match/match.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/rdbdatatest'), UserModule, QueueModule, MatchModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

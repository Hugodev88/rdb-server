import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { MatchModule } from 'src/match/match.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue, QueueSchema } from './queue.schema';
import { QueueController } from './queue.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]), MatchModule],
  providers: [QueueService],
  controllers: [QueueController]
})
export class QueueModule { }

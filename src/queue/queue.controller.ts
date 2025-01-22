import { Body, Controller, Delete, Post } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { QueueService } from './queue.service';
import { JoinQueueDto } from './dtos/join-queue.dto';
import { ExitQueueDto } from './dtos/exit-queue.dto';

@Controller('queue')
export class QueueController {

    constructor(
        private readonly queueService: QueueService
    ) { }

    @Post()
    async joinQueue(@Body() user: JoinQueueDto) {
        return this.queueService.joinQueue(user)
    }

    @Delete()
    async exitQueue(@Body() user: ExitQueueDto) {
        return this.queueService.exitQueue(user)
    }
}

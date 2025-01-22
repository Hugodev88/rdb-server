import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queue } from './queue.schema';
import { User } from 'src/user/user.schema';
import { MatchService } from 'src/match/match.service';
import { JoinQueueDto } from './dtos/join-queue.dto';
import { ExitQueueDto } from './dtos/exit-queue.dto';

@Injectable()
export class QueueService {
    constructor(
        @InjectModel(Queue.name) private queueModel: Model<Queue>,
        private readonly matchService: MatchService
    ) { }

    async joinQueue(userData: JoinQueueDto) {
        const queue = await this.queueModel.find();

        // Verificar se o usuário já está na fila
        const user = await this.queueModel.where({ playerId: userData.playerId });
        if (user.length > 0) {
            throw new BadRequestException('Você já está na fila.')
        }

        if (queue.length < 4) {
            await this.queueModel.create(userData);

            const updatedQueue = await this.queueModel.find();
            if (updatedQueue.length === 4) {
                await this.matchService.startMatch(updatedQueue);
                await this.deleteQueue();
            }
        } else {
            throw new Error('Fila indisponível.');
        }
    }

    async deleteQueue() {
        await this.queueModel.deleteMany();
        console.log('Fila removida após a criação da partida.');
    }

    async exitQueue(userData: ExitQueueDto) {
        const user = await this.queueModel.where({ playerId: userData.playerId });

        if (user.length === 0) {
            throw new BadRequestException('Você não está na fila.');
        }

        await this.queueModel.findOneAndDelete({ playerId: userData.playerId })

        return
    }
}

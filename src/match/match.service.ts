import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queue } from 'src/queue/queue.schema';
import { Match } from './match.schema';

@Injectable()
export class MatchService {

    constructor(
        @InjectModel(Match.name) private matchModel: Model<Match>,
    ) { }

    async startMatch(queue: Queue[]) {

        // Lógica de criação de times com base no rating dos jogadores
        const sortedQueue = queue.sort((a, b) => b.rating - a.rating);

        // Divisão de times: maior MMR com menor MMR
        const team1 = [sortedQueue[0], sortedQueue[3]]; // Jogador 1 e 4
        const team2 = [sortedQueue[1], sortedQueue[2]]; // Jogador 2 e 3

        // Montar os dados da partida (substitua com seu schema de partida)
        const match = {
            team1: team1.map(player => ({
                playerId: player._id,
                rating: player.rating,
                civ: player.civ,
            })),
            team2: team2.map(player => ({
                playerId: player._id,
                rating: player.rating,
                civ: player.civ,
            })),
            winner: null,
        };

        // Salvando a partida no banco de dados
        const newMatch = new this.matchModel(match);
        return await newMatch.save();
    }

    async defineWinner() {

    }


}

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Queue extends Document {
    @Prop({ required: true })
    playerId: string; // ID do jogador, por exemplo, vindo do sistema de autenticação.

    @Prop({ required: true })
    rating: number; // Rating (MMR) do jogador.

    @Prop({ default: null })
    civ: string; // Civilização escolhida (opcional, se precisar).

    @Prop({ default: false })
    inMatch: boolean; // Indica se o jogador já foi alocado para uma partida.
}

export const QueueSchema = SchemaFactory.createForClass(Queue);

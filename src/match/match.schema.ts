import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Match extends Document {
    @Prop({ required: true })
    team1: { playerId: string; rating: number; civ: string }[];

    @Prop({ required: true })
    team2: { playerId: string; rating: number; civ: string }[];

    @Prop({ default: null })
    winner: number; // 1 para team1, 2 para team2, ou null se ainda em andamento.
}

export const MatchSchema = SchemaFactory.createForClass(Match);

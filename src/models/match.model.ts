import mongoose from 'mongoose';

const { Schema } = mongoose;

const matchSchema = new Schema({
  player: String,
  date: String,
  tournament: String,
  map: String,
  kill: String,
  death: String,
  assist: String,
  team1: String,
  team2: String,
  agents1: [String],
  agents2: [String],
  score: String,
});

matchSchema.index({ player: 1 }, { name: 'MatchPlayerIndex', collation: { locale: 'en', strength: 1 } });

export type MatchDocument = mongoose.Document & {
  player: string;
  date: string;
  tournament: string;
  map: string;
  kill: string;
  death: string;
  assist: string;
  team1: string;
  team2: string;
  agents1: string[];
  agents2: string[];
  score: string;
};

export const Match = mongoose.model<MatchDocument>('Match', matchSchema, 'matchs');

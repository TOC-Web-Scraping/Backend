import mongoose from 'mongoose';

const { Schema } = mongoose;

const teamSchema = new Schema({
  name: String,
  location: String,
  logo: String,
  region: String,
  totalWinnings: Number,
  achievements: [
    {
      date: String,
      placement: String,
      tournamanet: String,
      prize: String,
    },
  ],
  url: String,
});

export type TeamDocument = mongoose.Document & {
  name: string;
  location: string;
  logo: string;
  region: string;
  totalWinnings: number;
  achievements: {
    date: string;
    placement: string;
    tournament: string;
    prize: string;
  }[];
  url: string;
};

export const Team = mongoose.model<TeamDocument>('Team', teamSchema, 'teams');

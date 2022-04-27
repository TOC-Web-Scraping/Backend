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

teamSchema.index({ name: 1 }, { name: 'TeamNameIndex', collation: { locale: 'en', strength: 1 } });
teamSchema.index({ region: 1 }, { name: 'TeamRegionIndex', collation: { locale: 'en', strength: 1 } });
teamSchema.index({ location: 1 }, { name: 'TeamLocationIndex', collation: { locale: 'en', strength: 1 } });
teamSchema.index({ url: 1 }, { name: 'TeamURLIndex', collation: { locale: 'en', strength: 1 } });

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

import mongoose from 'mongoose';

const { Schema } = mongoose;

const playerSchema = new Schema({
  url: String,
  name: String,
  realName: String,
  team: String,
  imageUrl: String,
  country: [String],
  born: String,
  mainAgent: [String],
  gamingGear: Schema.Types.Mixed,
});

playerSchema.index({ name: 1 }, { name: 'PlayerNameIndex', collation: { locale: 'en', strength: 1 } });
playerSchema.index({ realName: 1 }, { name: 'PlayerRealNameIndex', collation: { locale: 'en', strength: 1 } });
playerSchema.index({ team: 1 }, { name: 'PlayerTeamIndex', collation: { locale: 'en', strength: 1 } });
playerSchema.index({ country: 1 }, { name: 'PlayerCountryIndex', collation: { locale: 'en', strength: 1 } });
playerSchema.index({ url: 1 }, { name: 'PlayerURLIndex', collation: { locale: 'en', strength: 1 } });

export type PlayerDocument = mongoose.Document & {
  url: string;
  name: string;
  realName: string;
  team: string;
  imageUrl: string;
  country: string[];
  born: string;
  mainAgent: string[];
  gamingGear: { [key: string]: any };
};

export const Player = mongoose.model<PlayerDocument>('Player', playerSchema, 'players');

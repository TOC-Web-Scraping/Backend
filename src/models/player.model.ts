import mongoose from 'mongoose';

const { Schema } = mongoose;

const playerSchema = new Schema({
  url: String,
  name: String,
  realName: String,
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  imageUrl: String,
  country: [String],
  born: String,
  mainAgent: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
    },
  ],
  gamingGear: Schema.Types.Mixed,
});

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

export const Player = mongoose.model<PlayerDocument>('Player', playerSchema);

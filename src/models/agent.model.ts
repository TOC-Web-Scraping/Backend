import mongoose from 'mongoose';

const { Schema } = mongoose;

interface Ability {
  name: string;
  imageUrl: string;
  type: string;
  topDescription: string[];
  bottomDescription: string;
  cost?: string;
  ultimateCost?: string;
}

const agentSchema = new Schema({
  name: String,
  imageUrl: String,
  country: String,
  role: String,
  releaseDate: String,
  abilities: Schema.Types.Mixed,
});

export type AgentDocument = mongoose.Document & {
  name: string;
  imageUrl: string;
  country: string;
  role: string;
  releaseDate: string;
  abilities: Ability[];
};

export const Agent = mongoose.model<AgentDocument>('Agent', agentSchema, 'agents');

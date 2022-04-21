import { Match } from '.';

export default interface Player {
  url: string;
  name: string;
  realName: string | null;
  team: string;
  imageUrl: string;
  country: string[];
  born: string;
  mainAgent: string[];
  gamingGear: any;
  matches: Match[];
}

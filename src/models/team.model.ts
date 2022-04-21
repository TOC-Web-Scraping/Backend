import { Player } from '.';

interface Achievement {
  date: string;
  placement: string;
  tournament: string;
  prize: string;
}

export default interface Team {
  name: string;
  location: string;
  logo: string;
  region: string;
  totalWinnings: number;
  achievements: Achievement[];
  url: string;
  players: Player[];
}

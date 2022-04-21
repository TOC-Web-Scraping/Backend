import fetch from 'cross-fetch';
import { Player } from '../models';

let players: Player[] | undefined;

async function dataFetch() {
  const response = await fetch('https://toc-web-scraping.github.io/scraping/data/players.json');
  players = await response.json();

  setTimeout(() => {
    players = undefined;
  }, 50000);
}

async function getPlayersByTeam(team: string, limit?: number, offset?: number) {
  if (!players) {
    await dataFetch();
  }
  let resultPlayers = players!.filter((p) => p.team === team);
  if (limit && offset) {
    resultPlayers = resultPlayers.slice(offset, offset + limit);
  }
  return resultPlayers;
}

export default {
  getPlayersByTeam,
};

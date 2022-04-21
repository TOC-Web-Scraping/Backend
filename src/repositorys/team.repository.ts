import fetch from 'cross-fetch';
import { Team } from '../models';
import { PlayerRepository } from '.';

let teams: Team[] | undefined;

async function dataFetch() {
  const response = await fetch('https://toc-web-scraping.github.io/scraping/data/teams.json');
  teams = await response.json();

  setTimeout(() => {
    teams = undefined;
  }, 50000);
}

async function getTeams(limit?: number, offset?: number) {
  if (!teams) {
    await dataFetch();
  }

  let resultTeams = teams;
  if (limit && offset) {
    resultTeams!.slice(offset, offset + limit);
  }
  resultTeams = await Promise.all(
    resultTeams!.map(async (team) => {
      const teamWithPlayers = team;
      const players = await PlayerRepository.getPlayersByTeam(team.url);
      teamWithPlayers.players = players;
      return teamWithPlayers;
    })
  );

  return resultTeams;
}

async function getTeamById(id: string) {
  if (!teams) {
    await dataFetch();
  }
  const team = teams!.find((t) => t.url === id);
  if (team) {
    team.players = await PlayerRepository.getPlayersByTeam(team.url);
  }
  return team;
}

export default {
  getTeams,
  getTeamById,
};

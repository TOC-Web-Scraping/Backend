import { Request, Response } from 'express';
import { PlayerRepository, TeamRepository } from '../repositorys';

async function getAllTeams(req: Request, res: Response) {
  try {
    const teams = await TeamRepository.getTeams(+req.params.limit, +req.params.offset);
    res.status(200).send(teams);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

async function getTeams(req: Request, res: Response) {
  try {
    const search: string = String(req.query.search);
    if (search === '' || search === 'undefined') {
      const response = await fetch('https://toc-web-scraping.github.io/scraping/data/teams.json');
      const teams: Team[] = await response.json();
      res.status(200).send(teams);
    } else {
      const response = await fetch('https://toc-web-scraping.github.io/scraping/data/teams.json');
      const teams: Team[] = await response.json();
      const filteredTeams = teams.filter((team) => {
        return (
          team.name.toLowerCase().includes(search.toLowerCase()) ||
          team.region.toLowerCase().includes(search.toLowerCase()) ||
          team.location.toLowerCase().includes(search.toLowerCase())
        );
      });
      res.status(200).send(filteredTeams);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

async function getPlayersByTeam(team: string) {
  try {
    const response = await fetch('https://toc-web-scraping.github.io/scraping/data/players.json');
    const players: Player[] = await response.json();
    const teamPlayers = players.filter((p) => p.team === team);
    return teamPlayers;
  } catch (err: any) {
    return [];
  }
}

async function getTeamById(req: Request, res: Response) {
  try {
    const team = await TeamRepository.getTeamById(req.params.id);
    if (team) {
      const teamPlayers = await PlayerRepository.getPlayersByTeam(team.url);
      team.players = teamPlayers;
      res.status(200).send(team);
    } else {
      res.status(404).send({ message: 'Team not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export default {
  getAllTeams,
  getTeamById,
  getTeams,
};

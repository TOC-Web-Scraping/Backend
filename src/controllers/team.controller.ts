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
};

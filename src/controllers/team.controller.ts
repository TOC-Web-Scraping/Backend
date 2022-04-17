import { Request, Response } from 'express';
import { Team, Player } from '../models';
import fetch from 'cross-fetch';

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
                return team.name.toLowerCase().includes(search.toLowerCase()) || team.region.toLowerCase().includes(search.toLowerCase()) || team.location.toLowerCase().includes(search.toLowerCase());
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
        const teamPlayers = players.filter(p => p.team === team);
        return teamPlayers
    }
    catch (err: any) {
        return [];
    }
}

async function getTeamById(req: Request, res: Response) {
    try {
        const response = await fetch('https://toc-web-scraping.github.io/scraping/data/teams.json');
        const teams: Team[] = await response.json();
        const team = teams.find(t => t.url === req.params.id);
        if (team) {
            const teamPlayers = await getPlayersByTeam(team.url);
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
    getTeams,
    getTeamById,

}
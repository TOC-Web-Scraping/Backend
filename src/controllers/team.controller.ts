import { Request, Response } from 'express';
import { Team } from '../models';
import fetch from 'cross-fetch';

async function getAllTeams(req: Request, res: Response) {
    try {
        const response = await fetch('https://toc-web-scraping.github.io/scraping/data/teams.json');
        const teams: Team[] = await response.json();
        res.status(200).send(teams);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }

}

async function getTeamById(req: Request, res: Response) {
    try {
        const response = await fetch('https://toc-web-scraping.github.io/scraping/data/teams.json');
        const teams: Team[] = await response.json();
        const team = teams.find(t => t.url === req.params.id);
        if (team) {
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
    getTeamById
}
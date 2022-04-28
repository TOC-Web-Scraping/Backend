import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Team , Match } from '../models';
import { cache } from '../middlewares/cache';

interface TeamFilters {
  name?: string;
  region?: string;
  location?: string;
}

async function getTeams(req: Request, res: Response) {
  try {
    const pageID = req.query.pageID as string;
    const pageSize = req.query.pageSize as string;

    const search = req.query.search as string;
    const region = req.query.region as string;

    let toQuery: FilterQuery<TeamFilters> = {};
    if (search) {
      const pattern = new RegExp(search, 'i');
      toQuery = { $or: [{ name: pattern }, { region: pattern }, { location: pattern }] };
    } else if (region) {
      toQuery.region = region;
    }

    let query = Team.find(toQuery).collation({ locale: 'en', strength: 1 });

    if (pageID && pageSize) {
      query = query.skip((+pageID - 1) * +pageSize).limit(+pageSize);
    }

    const result = await query;
    const jsonResult = result.map((r) => r.toJSON());

    cache.set(req.originalUrl, jsonResult, 60);

    res.status(200).json(jsonResult);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

async function getTeamById(req: Request, res: Response) {
  try {
    const teamNameFromUrlUnAwait = Team.findOne({url:req.params.id},{name:1,_id:0});
    const teamUnAwait = Team.aggregate([
      {
        $match: {
          url: req.params.id,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          localField: 'url',
          from: 'players',
          foreignField: 'team',
          as: 'players',
        },
      },/* แบบยาก
      {
        $lookup: {
          localField: 'name',
          from: 'matches',
          foreignField: 'team1',
          as: 'winLose1',
        }
      },
      {
        $lookup: {
          localField: 'name',
          from: 'matches',
          foreignField: 'team2',
          as: 'winLose2',
        },
      },*/
      {
        $project: {
          'players._id': 0,/* แบบยาก
          'winLose1._id': 0,
          'winLose1.player':0,
          'winLose1.date':0,
          'winLose1.tournament':0,
          'winLose1.map':0,
          'winLose1.kill':0,
          'winLose1.death':0,
          'winLose1.assist':0,
          'winLose1.team1':0,
          'winLose1.team2':0,
          'winLose1.agents1':0,
          'winLose1.agents2':0,
          'winLose2._id': 0,
          'winLose2.player':0,
          'winLose2.date':0,
          'winLose2.tournament':0,
          'winLose2.map':0,
          'winLose2.kill':0,
          'winLose2.death':0,
          'winLose2.assist':0,
          'winLose2.team1':0,
          'winLose2.team2':0,
          'winLose2.agents1':0,
          'winLose2.agents2':0,*/
        },
      },
    ]);
    const teamNameFromUrl = await teamNameFromUrlUnAwait;
    //const matchUnAwait = Match.find({'team1':});
    const team = await teamUnAwait;
    if (team.length > 0) {
      cache.set(req.originalUrl, team[0], 60);
      res.status(200).json(team[0]);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
  console.log('teamByIDisRequested');
}

export default {
  getTeamById,
  getTeams,
};

import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Team } from '../models';
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
    const team = await Team.aggregate([
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
      },
      {
        $project: {
          'players._id': 0,
        },
      },
    ]);

    if (team.length > 0) {
      cache.set(req.originalUrl, team[0], 60);
      res.status(200).json(team[0]);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export default {
  getTeamById,
  getTeams,
};

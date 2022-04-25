import { Request, Response } from 'express';
import { Team } from '../models';
import { cache } from '../middlewares/cache';

interface TeamFilters {
  name?: string;
  region?: string;
  local?: string;
}

async function getTeams(req: Request, res: Response) {
  try {
    const pageID = req.query.pageID as string;
    const pageSize = req.query.pageSize as string;
    const name = req.query.name as string;
    const region = req.query.region as string;
    const local = req.query.local as string;
    const filterValues: TeamFilters = { name, region, local };
    const filters: TeamFilters = {};

    Object.keys(filterValues).forEach((key) => {
      const tkey = key as keyof TeamFilters;
      if (filterValues[tkey]) {
        filters[tkey] = filterValues[tkey];
      }
    });

    let query = Team.find(filters);

    if (pageID && pageSize) {
      query = query.skip((+pageID - 1) * +pageSize).limit(+pageSize);
    }

    const result = await query;
    const jsonResult = result.map((r) => r.toJSON());

    cache.set(req.originalUrl, jsonResult, 60);

    res.status(200).json(result);
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

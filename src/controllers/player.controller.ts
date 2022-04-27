import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { cache } from '../middlewares/cache';
import { Player } from '../models';

interface PlayerFilters {
  name?: string;
  realName?: string;
  team?: string;
  country?: string;
}

async function getPlayers(req: Request, res: Response) {
  try {
    const pageID = req.query.pageID as string;
    const pageSize = req.query.pageSize as string;

    const search = req.query.search as string;
    const country = req.query.country as string;
    const team = req.query.team as string;

    let toQuery: FilterQuery<PlayerFilters>;
    if (search) {
      const pattern = new RegExp(search, 'i');
      toQuery = { $or: [{ name: pattern }, { realName: pattern }, { team: pattern }, { country: pattern }] };
    } else {
      toQuery = {};
      if (country) {
        toQuery.country = country;
      }
      if (team) {
        toQuery.team = team;
      }
    }

    let query = Player.find(toQuery).collation({ locale: 'en', strength: 1 });
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

async function getPlayerById(req: Request, res: Response) {
  try {
    const player = await Player.aggregate([
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
          from: 'matches',
          foreignField: 'player',
          as: 'matches',
        },
      },
      {
        $project: {
          'matchs._id': 0,
        },
      },
    ]);
    if (player.length > 0) {
      cache.set(req.originalUrl, player[0], 60);
      res.status(200).json(player[0]);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export default {
  getPlayers,
  getPlayerById,
};

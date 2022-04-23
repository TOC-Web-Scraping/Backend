import { Request, Response } from 'express';
import { Player } from '../models';

interface PlayerFilters {
  name?: string;
  realName?: string;
  team?: string;
}

async function getPlayers(req: Request, res: Response) {
  try {
    const pageID = req.query.pageID as string;
    const pageSize = req.query.pageSize as string;
    const name = req.query.name as string;
    const realName = req.query.realName as string;
    const team = req.query.team as string;
    const filterValues: PlayerFilters = { name, realName, team };
    const filters: PlayerFilters = {};

    Object.keys(filterValues).forEach((key) => {
      const tkey = key as keyof PlayerFilters;
      if (filterValues[tkey]) {
        filters[tkey] = filterValues[tkey];
      }
    });

    let query = Player.find(filters);
    if (pageID && pageSize) {
      query = query.skip((+pageID - 1) * +pageSize).limit(+pageSize);
    }
    const result = await query;
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

async function getPlayerById(req: Request, res: Response) {
  try {
    // const player = await Player.findOne({ url: req.params.id });
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
          from: 'players',
          foreignField: 'player',
          as: 'matchs',
        },
      },
      {
        $project: {
          'matchs._id': 0,
        },
      },
    ]);
    if (player.length > 0) {
      res.status(200).json(player);
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

import { Request, Response } from 'express';
import { Player } from '../models';
// import { Player, Match } from '../models';
// import fetch from 'cross-fetch';

// async function getPlayers(req: Request, res: Response) {
//     try {
//         const search: string = String(req.query.search);
//         if (search === '' || search === 'undefined') {
//             const response = await fetch('https://toc-web-scraping.github.io/scraping/data/players.json');
//             const players: Player[] = await response.json();
//             res.status(200).send(players);
//         } else {
//             const response = await fetch('https://toc-web-scraping.github.io/scraping/data/players.json');
//             const players: Player[] = await response.json();
//             const filteredPlayers = players.filter((player) => {
//                 return player.name?.toLowerCase().includes(search.toLowerCase()) || player.realName?.toLowerCase().includes(search.toLowerCase()) || player.team?.toLowerCase().includes(search.toLowerCase());
//             });
//             res.status(200).send(filteredPlayers);
//         }

//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }

// }

// async function getMatchesByPlayer(player: string) {
//     try {
//         const response = await fetch('https://toc-web-scraping.github.io/scraping/data/matchs.json');
//         const matches: Match[] = await response.json();
//         const playerMatches = matches.filter(m => m.player === player);
//         return playerMatches
//     }
//     catch (err: any) {
//         console.log(err);
//         return [];
//     }
// }

// async function getPlayerById(req: Request, res: Response) {
//     try {
//         const response = await fetch('https://toc-web-scraping.github.io/scraping/data/players.json');
//         const players: Player[] = await response.json();
//         const player = players.find(p => p.url === req.params.id);
//         if (player) {
//             const playerMatches = await getMatchesByPlayer(player.url);
//             player.matches = playerMatches;
//             res.status(200).send(player);
//         } else {
//             res.status(404).send({ message: 'Player not found' });
//         }
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// }

// export default {
//     getPlayers,
//     getPlayerById,
// }

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

import { Request, Response } from 'express';
import { cache } from '../middlewares/cache';
import { ValoMap } from '../models';

interface ValoMapFilters {
  mapName?: string;
  country?: string;
  bombSites?: string;
  teleporters?: string;
}

async function getValoMaps(req: Request, res: Response) {
  try {
    const pageID = req.query.pageID as string;
    const pageSize = req.query.pageSize as string;
    const mapName = req.query.mapName as string;
    const country = req.query.country as string;
    const bombSites = req.query.bombSites as string;
    const teleporters = req.query.teleporters as string;
    const filterValues: ValoMapFilters = { mapName, country, bombSites, teleporters };
    const filters: ValoMapFilters = {};

    Object.keys(filterValues).forEach((key) => {
      const tkey = key as keyof ValoMapFilters;
      if (filterValues[tkey]) {
        filters[tkey] = filterValues[tkey];
      }
    });

    let query = ValoMap.find(filters);
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

export default {
  getValoMaps,
};

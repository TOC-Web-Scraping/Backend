import NodeCache from 'node-cache';
import { Request, Response, NextFunction } from 'express';

export const cache = new NodeCache();

export function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'GET') {
    console.error('Cannot cache non-GET method');
    next();
    return;
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(`Cache hit with ${key}`);
    res.json(cachedResponse);
  } else {
    console.log(`Cache miss with ${key}`);
    next();
  }
}

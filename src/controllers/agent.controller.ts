import { Request, Response } from 'express';

import { Agent } from '../models';

async function getAgents(req: Request, res: Response) {
  try {
    const { pageID, pageSize } = req.query;
    let query = Agent.find();
    if (pageID && pageSize) {
      query = query.skip((+pageID - 1) * +pageSize).limit(+pageSize);
    }
    const result = await query;
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export default {
  getAgents,
};

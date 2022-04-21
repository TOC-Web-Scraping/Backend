import { Request, Response } from 'express';
import { AgentService } from '../services';
import { Agent } from '../models';
async function getAgents(req: Request, res: Response) {
    try {
        const search: string = String(req.query.search);
        const agents=await AgentService.getAgentsService(search);
        if (agents) {
            res.status(200).send(agents);
        } else {
            res.status(404).send({ message: 'Agent not found' });
        }

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }

}

export default {
    getAgents

}
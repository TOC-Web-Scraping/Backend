import { Router } from 'express';
import { AgentController } from '../controllers';
import { cacheMiddleware } from '../middlewares/cache';

const router = Router();

router.get('/', cacheMiddleware, AgentController.getAgents);

export default router;

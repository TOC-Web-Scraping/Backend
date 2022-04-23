import { Router } from 'express';
import { AgentController } from '../controllers';

const router = Router();

router.get('/', AgentController.getAgents);

export default router;

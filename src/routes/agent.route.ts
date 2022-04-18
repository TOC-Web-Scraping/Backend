import { Router } from 'express';
import { AgentController } from '../controllers';

const router = Router();

router.get('/', AgentController.getAgents);
router.get('/:id', AgentController.getAgentById);

export default router;
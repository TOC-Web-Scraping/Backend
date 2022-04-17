import { Router } from 'express';
import { TeamController } from '../controllers';

const router = Router();

router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getTeamById);

export default router;
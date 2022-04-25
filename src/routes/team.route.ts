import { Router } from 'express';
import { TeamController } from '../controllers';
import { cacheMiddleware } from '../middlewares/cache';

const router = Router();

router.get('/', cacheMiddleware, TeamController.getTeams);
router.get('/:id', cacheMiddleware, TeamController.getTeamById);

export default router;

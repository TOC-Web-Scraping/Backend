import { Router } from 'express';
import { PlayerController } from '../controllers';
import { cacheMiddleware } from '../middlewares/cache';

const router = Router();

router.get('/', cacheMiddleware, PlayerController.getPlayers);
router.get('/:id', cacheMiddleware, PlayerController.getPlayerById);

export default router;

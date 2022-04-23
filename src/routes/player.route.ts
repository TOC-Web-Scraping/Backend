import { Router } from 'express';
import { PlayerController } from '../controllers';

const router = Router();

router.get('/', PlayerController.getPlayers);
router.get('/:id', PlayerController.getPlayerById);

export default router;

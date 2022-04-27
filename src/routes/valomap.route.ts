import { Router } from 'express';
import { ValoMapController } from '../controllers';
import { cacheMiddleware } from '../middlewares/cache';

const router = Router();

router.get('/', cacheMiddleware, ValoMapController.getValoMap);

export default router;

import { Router, Request, Response } from 'express';
import TeamRouter from './team.route';
import PlayerRouter from './player.route';

const router: Router = Router();

router.use('/teams', TeamRouter);
router.use('/players', PlayerRouter);

export default router;
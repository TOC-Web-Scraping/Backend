import { Router } from 'express';
import TeamRouter from './team.route';
import PlayerRouter from './player.route';
import AgentRouter from './agent.route';

const router: Router = Router();

router.use('/teams', TeamRouter);
router.use('/players', PlayerRouter);
router.use('/agents', AgentRouter);

export default router;

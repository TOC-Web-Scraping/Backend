import { Router } from 'express';
import TeamRouter from './team.route';
import PlayerRouter from './player.route';
import AgentRouter from './agent.route';
import ValoMapRouter from './valomap.route';

const router: Router = Router();

router.use('/teams', TeamRouter);
router.use('/players', PlayerRouter);
router.use('/agents', AgentRouter);
router.use('/maps', ValoMapRouter);

export default router;

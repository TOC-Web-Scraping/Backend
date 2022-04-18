import { Router, Request, Response } from 'express';
import TeamRouter from './team.route';
import AgentRouter from './agent.route';

const router: Router = Router();

router.use('/teams', TeamRouter);
router.use('/agents', AgentRouter);

export default router;
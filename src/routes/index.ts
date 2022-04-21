import { Router, Request, Response } from 'express';
import TeamRouter from './team.route';

const router: Router = Router();

router.use('/teams', TeamRouter);

export default router;

import { Router } from 'express';
import userRouter from './routers/userRouter';

const router = new Router();

router.use('/user', userRouter);

export default router;
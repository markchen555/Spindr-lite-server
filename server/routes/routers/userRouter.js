import { Router } from 'express';
import userCtrl from '../../controllers/userCtrl';
import verifyToken from '../middleware/verifyToken';

const userRouter = new Router();

userRouter.route('/')
  .get(verifyToken, userCtrl.getUser)

userRouter.route('/signup')
  .post(userCtrl.signup)

userRouter.route('/login/:username')
  .post(userCtrl.login);


export default userRouter;
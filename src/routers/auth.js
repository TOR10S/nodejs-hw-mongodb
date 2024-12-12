import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema} from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';


const AuthRouter = Router();

AuthRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
AuthRouter.post('/send-reset-email',validateBody(requestResetEmailSchema),ctrlWrapper(requestResetEmailController),);
AuthRouter.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUserController));
AuthRouter.post('/logout', ctrlWrapper(logoutUserController));
AuthRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));
AuthRouter.post('/reset-pwd',validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController),);

export default AuthRouter;

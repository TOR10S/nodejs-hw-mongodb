import ContactRouter from "./contacts.js";
import AuthRouter from "./auth.js";
import { Router } from 'express';

const router = Router();

router.use("/contacts", ContactRouter);
router.use("/auth", AuthRouter);

export default router;

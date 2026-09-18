import { Router } from "express";
import adminLogin from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post('/',adminLogin)

export default adminRouter;
import express from "express";
import { Register, Login, getMyProfile, Logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/register",Register)

router.post("/login",Login)

router.get("/me",isAuthenticated,getMyProfile)

router.get("/logout",Logout)

export default router;
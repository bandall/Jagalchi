import express, { Router } from "express";
import { 
    logout, 
    getEdit, 
    postEdit, 
    getChangePassword, 
    postChangePassword,
    postUserInfo
 } from "../controllers/userControll";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares";
const userRouter = express.Router();

userRouter.route("/logout").post(logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.route("/change-password").get(getChangePassword).post(postChangePassword);
//userRouter.route("/info/:id").get();


export default userRouter;
import express from "express";
import { home, attendance } from "../controllers/defaultControll"
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControll";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares.js";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/test").get((req, res)=> res.send("YES"));
rootRouter.route("/join").post(postJoin);
rootRouter.route("/login").post(postLogin);
rootRouter.route("/attendance").get(attendance);


export default rootRouter;
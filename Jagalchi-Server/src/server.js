import express  from "express";
import morgan from "morgan";
import "dotenv/config";
import "./db";
import "./models/User";
import MongoStore from "connect-mongo";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({ 
    origin: ['http://localhost:3000'],
    credentials: true,
}));

//app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

app.get("*", (req, res) => res.sendFile(process.env.ASSET_PATH + "/index.html"));
app.listen(PORT , () => console.log(`Server Listening on Port http://localhost:${PORT}`));
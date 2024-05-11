import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import connectMongoDB from "./config.js";
import { checkForAuthentication, restrictTo } from "./middlewares/auth.js";

import URL from './models/url.js';

import urlRoute from "./routes/url.js";
import staticRouter from './routes/staticRouter.js';
import userRoute from "./routes/user.js";

const app = express();
const PORT = 3000;

connectMongoDB("") //enter your database url here
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error Occur", err));

// Setting Embedded js for rendering html file
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRouter);
app.use('/user', userRoute);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

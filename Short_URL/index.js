import express from "express";
import path from "path";
import urlRoute from "./routes/url.js";
import connectMongoDB from "./config.js";
import staticRouter from './routes/staticRouter.js'
import URL from './models/url.js';

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



app.use("/url", urlRoute);
app.use("/", staticRouter);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

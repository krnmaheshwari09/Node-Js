const express = require("express");

const userRouter = require("./routes/user.js");
const {connectMongoDB} = require("./config.js");
const {logReqRes} = require("./middlewares/index.js");

const app = express();
const PORT = 3000;
// const url =`mongodb+srv://krnmaheshwari09:K@r@n2004@cluster0.ww3hvmy.mongodb.net/`

// connection
connectMongoDB(`mongodb://127.0.0.1:27017/youtube-app-1`)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error", err));

// Middlewares - almost like plugin in express
app.use(express.urlencoded({ extended: false }));
// custom middleware
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at Port: http://localhost:${PORT}/`));
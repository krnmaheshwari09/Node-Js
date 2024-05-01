import express from "express";
import urlRoute from "./routes/url.js";
import connectMongoDB from "./config.js";

const app = express();
const PORT = 3000;

connectMongoDB("mongodb+srv://krnmaheshwari09:Karan2004@test-data.edzavq1.mongodb.net/?retryWrites=true&w=majority&appName=test-data")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error Occur", err));


app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
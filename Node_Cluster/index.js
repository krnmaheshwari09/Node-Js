import express from "express";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    return res.json({ message: `Hello from Server ${process.pid}` });
});

app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`));
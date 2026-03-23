require("dotenv").config();
const express = require("express");
const cors = require("cors");

const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const commentRouter = require("./routes/comments");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => {
    res.send("API is running! Try /posts or /categories.");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server działa na http://localhost:${PORT}`));

module.exports = { app };

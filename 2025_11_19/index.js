require("dotenv").config();
const express = require("express");

const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const commentRouter = require("./routes/comments");
const { PrismaClient } = require("@prisma/client");


const app = express();
app.use(express.json());
const prisma = new PrismaClient();

// connectMongo();
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/comments", commentRouter);

app.listen(3000, () => console.log("Server działa na http://localhost:3000"));

module.exports = { app};
// connectMongo

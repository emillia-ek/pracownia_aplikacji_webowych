require("dotenv").config();
const express = require("express");
const { connectMongo } = require("./db");
const accessLogger = require("./accessLogger");
const errorHandler = require("./errorHandler");

const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const commentRouter = require("./routes/comments");

const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

connectMongo();
app.use(accessLogger);
app.use(express.json());

app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/comments", commentRouter);

app.get('/', (req, res) => {
    res.send('Aplikacja dziala');
});

app.use(errorHandler);

app.listen(3000, () => console.log("Server dziala na http://localhost:3000"));

module.exports = { app, prisma };
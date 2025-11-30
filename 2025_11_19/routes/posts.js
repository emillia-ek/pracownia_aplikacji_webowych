const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    const posts = await prisma.post.findMany({ include: { category: true, comments: true } });
    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const post = await prisma.post.findUnique({
        where: { id: Number(req.params.id) },
        include: { category: true, comments: true }
    });
    res.json(post);
});

router.post("/", async (req, res) => {
    const { title, content, categoryId } = req.body;
    const post = await prisma.post.create({
        data: { title, content, categoryId }
    });
    res.json(post);
});

router.put("/:id", async (req, res) => {
    const { title, content, categoryId } = req.body;
    const post = await prisma.post.update({
        where: { id: Number(req.params.id) },
        data: { title, content, categoryId }
    });
    res.json(post);
});

router.delete("/:id", async (req, res) => {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "deleted" });
});

module.exports = router;
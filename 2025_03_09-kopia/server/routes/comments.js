const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    const comments = await prisma.comment.findMany({ include: { post: true } });
    res.json(comments);
});

router.get("/:id", async (req, res) => {
    const comment = await prisma.comment.findUnique({
        where: { id: Number(req.params.id) },
        include: { post: true }
    });
    res.json(comment);
});

router.post("/", async (req, res) => {
    const { content, postId } = req.body;
    const comment = await prisma.comment.create({
        data: { content, postId }
    });
    res.json(comment);
});

router.put("/:id", async (req, res) => {
    const { content } = req.body;
    const comment = await prisma.comment.update({
        where: { id: Number(req.params.id) },
        data: { content }
    });
    res.json(comment);
});

router.delete("/:id", async (req, res) => {
    await prisma.comment.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "deleted" });
});

module.exports = router;
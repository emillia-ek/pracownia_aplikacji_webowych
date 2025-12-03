const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany({ include: { post: true } });
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const comment = await prisma.comment.findUniqueOrThrow({
            where: { id: Number(req.params.id) },
            include: { post: true }
        });
        res.json(comment);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { content, postId } = req.body;
        const comment = await prisma.comment.create({
            data: { content, postId: Number(postId) }
        });
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { content } = req.body;
        const comment = await prisma.comment.update({
            where: { id: Number(req.params.id) },
            data: { content }
        });
        res.json(comment);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await prisma.comment.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
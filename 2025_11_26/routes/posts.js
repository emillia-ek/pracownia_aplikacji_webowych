const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({ include: { category: true, comments: true } });
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const post = await prisma.post.findUniqueOrThrow({
            where: { id: Number(req.params.id) },
            include: { category: true, comments: true }
        });
        res.json(post);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { title, content, categoryId } = req.body;
        const post = await prisma.post.create({
            data: { title, content, categoryId: Number(categoryId) }
        });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { title, content, categoryId } = req.body;
        const post = await prisma.post.update({
            where: { id: Number(req.params.id) },
            data: { title, content, categoryId: Number(categoryId) }
        });
        res.json(post);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await prisma.post.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
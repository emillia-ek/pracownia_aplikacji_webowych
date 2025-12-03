const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({ include: { posts: true } });
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const category = await prisma.category.findUniqueOrThrow({
            where: { id: Number(req.params.id) },
            include: { posts: true }
        });
        res.json(category);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({ data: { name } });
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.update({
            where: { id: Number(req.params.id) },
            data: { name }
        });
        res.json(category);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await prisma.category.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
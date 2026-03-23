const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    const categories = await prisma.category.findMany({ include: { posts: true } });
    res.json(categories);
});

router.get("/:id", async (req, res) => {
    const category = await prisma.category.findUnique({
        where: { id: Number(req.params.id) },
        include: { posts: true }
    });
    res.json(category);
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    res.json(category);
});

router.put("/:id", async (req, res) => {
    const { name } = req.body;
    const category = await prisma.category.update({
        where: { id: Number(req.params.id) },
        data: { name }
    });
    res.json(category);
});

router.delete("/:id", async (req, res) => {
    await prisma.category.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "deleted" });
});

module.exports = router;
import express from "express";

const messageRouter = express.Router();

messageRouter.get("/", async (req, res) => {
    res.send("Hello message");
})

messageRouter.post("/", async (req, res) => {
res.send("Hello");
})

export default messageRouter;
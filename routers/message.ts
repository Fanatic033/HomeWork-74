import express from "express";
import {promises as fs} from 'fs';
import {MessageWithoutId} from "../types";

const messageRouter = express.Router();

const fileName = './messages'

messageRouter.get("/", async (req, res) => {
    try {
        const files = await fs.readFile(fileName,);
        res.send("Hello message");
    } catch (err) {
        console.log(err);
    }
})

messageRouter.post("/", async (req, res) => {
    const message: MessageWithoutId = {
        message: req.body.message,
        datetime: new Date().toISOString(),
    };
    const allPath = `${fileName}/${message.datetime}.txt`;
    try {
        await fs.writeFile(allPath, JSON.stringify(message))
        res.send(message);
    } catch (e) {
        console.error(e);
    }

})

export default messageRouter;
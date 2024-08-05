import express from "express";
import {promises as fs} from 'fs';
import {IMessage} from "../types";

const messageRouter = express.Router();

const fileName = './messages'

messageRouter.get("/", async (req, res) => {
    try {
        const messages:IMessage[] = []
        const files = await fs.readdir(fileName);
        for (const file of files) {
            const filePath = `${fileName}/${file}`;
            const content = await fs.readFile(filePath, 'utf-8');
            messages.push(JSON.parse(content));
        }
        const slicedMessage = messages.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()).slice(0, 5)
        res.send(slicedMessage);
    } catch (err) {
        console.log(err);
    }
})

messageRouter.post("/", async (req, res) => {
    const message: IMessage = {
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
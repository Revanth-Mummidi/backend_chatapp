import { Router } from "express"
import { getMessages, sendMessage } from "../controllers/messageController.js";
import validateToken from "../middlewares/validateToken.js";
const messageRouter = Router();

messageRouter.get("/:id",validateToken,getMessages);
messageRouter.post("/send/:id",validateToken,sendMessage);




export default messageRouter;
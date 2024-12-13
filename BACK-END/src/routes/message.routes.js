import express from "express";
import { protectRoute } from "../middlewareres/auth.middleware.js";
import { getUsersForSidebar, sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",protectRoute, getUsersForSidebar);
router.post("/send/:id",protectRoute, sendMessage);
router.get("/:id",protectRoute, getMessages);

export default router;
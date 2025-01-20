import { Router, Request, Response, NextFunction } from "express";
import { sendMessage } from "../services/whatsappService";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the home page!");
});
router.post(
  "/send",
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
      res.status(400).json({ error: "Phone and message are required." });
    }

    try {
      await sendMessage(phone, message);
      res
        .status(200)
        .json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending message:", error);
      next(error); // Pass error to the error-handling middleware
    }
  }
);

export default router;

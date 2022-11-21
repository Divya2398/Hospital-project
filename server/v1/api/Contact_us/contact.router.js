import express from "express";
import Controller from "./contact.controller.js";

const app = express();

const router = express.Router();

router.post("/contact-us-message", Controller.Contact);
router.get("/user-query", Controller.Query);
router.get("/user-feedback", Controller.Feedback);
router.get("/user-complaint", Controller.Complaint);
router.get("/all-message", Controller.Allmessage);

export default router;

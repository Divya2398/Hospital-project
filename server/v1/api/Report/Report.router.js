import express from "express";
import Controller from "./Report.controller.js";
const router = express.Router();

router.post("/get-daily-Report", Controller.addreport);
router.get("/get-daily-Report", Controller.getDailyReport);
router.get("/get-Report", Controller.getreport);

export default router;

import express from "express";
import Controller from "./Report.controller.js";
const router = express.Router();

router.post("/add-report", Controller.addreport);
router.get("/get-patient-Report", Controller.getPatientReport);
router.get("/get-Report", Controller.getreport);

export default router;

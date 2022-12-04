import express from "express";
import Controller from "./Report.controller.js";
const router = express.Router();

router.post("/add-report", Controller.addreport);
router.get("/get-patient-Report", Controller.getPatientReport);
router.get("/get-Report", Controller.getreport);
router.post("/patient-Report-byId", Controller.patientReportId);
router.post("/view-patient-Report", Controller.checkpatienthistory);
export default router;

import express from "express";
import Controller from "./appointment.controller.js";

const app = express();

const router = express.Router();

router.post("/request-appointment", Controller.requestedappointment);
router.get("/get-pending-appointment", Controller.getRequestedAppointment);
router.put("/confirm-appointment", Controller.confirmAppointment);
router.put("/deny-appointment", Controller.denyAppointment);
router.get("/booked", Controller.Booked);
router.get("/get-today-appointment", Controller.getTodayAppointment);

export default router;

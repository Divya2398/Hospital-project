import express from "express";
const app = express();

import User from "./User/user.router.js";
import Admin from "./Admin/admin.router.js";
import Departments from "./Departments/departments.router.js";
import Specialist from "./Specialist/specialist.router.js";
import appSettings from "./App_Settings/app.router.js";
import paymentSettings from "./Payment_Settings/payment.router.js";
import Appointment from "./User/user.router.js";
import Track from "./OP_Tracking/tracking.router.js";
import Specialist_day_slot from "./Specialist_day_slot/Specialist_day_slot.router.js";
import DoctorLog from "./DoctorLog/Doctorlog.router.js";
import Contact_us from "./Contact_us/contact.router.js";
import Report from "./Report/Report.router.js";

app.use("/user", User);
app.use("/admin", Admin);
app.use("/departements", Departments);
app.use("/specialist", Specialist);
app.use("/specialistDaySlot", Specialist_day_slot);
app.use("/appSettings", appSettings);
app.use("/paymentSettings", paymentSettings);
app.use("/book", Appointment);
app.use("/track", Track);
app.use("/doctorlog", DoctorLog);
app.use("/contact", Contact_us);
app.use("/reports", Report);
export default app;

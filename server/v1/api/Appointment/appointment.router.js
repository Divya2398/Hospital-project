import  express  from "express";
import Controller from "./appointment.controller.js"

const app = express()

const router = express.Router()

router.post('/appointment', Controller.appointment)

router.get('/booked', Controller.Booked)

export default router;
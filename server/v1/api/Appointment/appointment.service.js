import appointmentSchema from "./appointment.model.js";
import userId from "../User/user.model.js";

async function appointment(req, res, next) {
  try {
    let patientId = req.patient_id;

    let details = await appointmentSchema
      .findOne({ patient_id: patientId })
      .exec();
    if (details) {
      return res.json({ status: "failed", message: "already booked" });
    }
    let data = new appointmentSchema(req);
    let result = await data.save();
    console.log("service", result);
    return res.json({
      status: "success",
      message: "appointment booked",
      result: result,
    });
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

async function Booked(req, res, next) {
  try {
    await appointmentSchema
      .find()
      .then((data) => {
        return res.json({
          status: "success",
          message: "booked appointments",
          result: data,
        });
      })
      .catch((err) => {
        return res.json({ message: err.message });
      });
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

export default {
  appointment,
  Booked,
};

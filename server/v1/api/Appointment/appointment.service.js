import appointmentSchema from "./appointment.model.js";
import userSchema from "../User/user.model.js";
import userId from "../User/user.model.js";
import moment from "moment";

async function requestedappointment(req, res, next) {
  try {
    let patientId = req.patient_id;
    let date = req.requested_date;
    let doctor_id = req.doctor_id;
    let details = await appointmentSchema
      .findOne({ patient_id: patientId, confrimed_date: date, doctor_id })
      .exec();
    if (details) {
      return res.json({
        status: "failed",
        message:
          "You already booked an Appointment with same doctor on same date",
      });
    } else {
      let data = new appointmentSchema(req);
      let result = await data.save();
      console.log("service", result);
      return res.json({
        status: "success",
        message: "Submitted your Request , Soon you will get a respond",
        result: result,
      });
    }
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

async function getRequestedAppointment(req, res, next) {
  try {
    const pending = await appointmentSchema.aggregate([
      {
        $match: {
          appointment_staus: "pending",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "patient_id",
          foreignField: "patient_id",
          as: "data",
        },
      },
      // console.log(data),
      {
        $unwind: {
          path: "$data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          patient_id: 1,
          requested_date: 1,
          appointment_id: 1,
          doctor_name: 1,
          doctor_id: 1,
          department_id: 1,
          department_name: 1,
          appointment_staus: 1,
          "data.first_name": 1,
          "data.last_name": 1,
          "data.mobile_number": 1,
          "data.email": 1,
        },
      },
    ]);
    if (pending) {
      return res.status(200).json({
        status: "success",
        message: "patients appointment fetched",
        result: pending,
      });
    } else {
      return res.status(400).json({ status: "no data found" });
    }
  } catch (error) {
    console.log("error", error.message);
    return res.json({ message: error.message });
  }
}

async function confirmAppointment(req, res, next) {
  try {
    console.log(req.query.appointment_id);
    console.log("data", req.body);
    let id = req.query.appointment_id;
    let date = req.body.confirm_date;
    const data = moment(date).format("YYYY-MM-DD");
    const find = await appointmentSchema.findOne({ appointment_id: id }).exec();
    if (find) {
      console.log(find);
      const update = await appointmentSchema.findOneAndUpdate(
        { appointment_id: id },
        { $set: { confrimed_date: data }, appointment_staus: "conform" },
        { new: true }
      );
      console.log("data", update);
      return res.json({
        status: "success",
        message: "booked appointments",
        result: update,
      });
    } else {
      return res.json({
        status: "failure",
        message: "no such appointment record",
      });
    }
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

async function denyAppointment(req, res, next) {
  try {
    console.log(req.query.appointment_id);
    // console.log("data", req.body);
    let id = req.query.appointment_id;
    const find = await appointmentSchema.findOne({ appointment_id: id }).exec();
    if (find) {
      console.log(find);
      const update = await appointmentSchema.findOneAndUpdate(
        { appointment_id: id },
        { appointment_staus: "deny" },
        { new: true }
      );
      console.log("data", update);
      return res.json({
        status: "success",
        message: "appointment denied",
        result: update,
      });
    } else {
      return res.json({
        status: "failure",
        message: "no such appointment record",
      });
    }
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

async function getTodayAppointment(req, res, next) {
  try {
    const current = new Date();
    const date = moment(current).format("YYYY-MM-DD");

    console.log("date", date);
    const department_id = req.query.department_id;
    const doctor_id = req.query.doctor_id;
    // const date = `${current.getDate()}/${
    //   current.getMonth() + 1
    // }/${current.getFullYear()}`;
    const find = await appointmentSchema
      .find({
        department_id,
        doctor_id,
        appointment_staus: "conform",
        confrimed_date: date,
      })
      .exec();
    if (find) {
      return res.json({
        status: "success",
        message: "today's appointment",
        result: find,
      });
    } else {
      return res.json({ status: "failure", message: "no data" });
    }
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

async function getTodayApp(req, res, next) {
  try {
    const current = new Date();
    const date = moment(current).format("YYYY-MM-DD");
    console.log("date", date);
    const department_id = req.query.department_id;
    const doctor_id = req.query.doctor_id;
    const appointment = await appointmentSchema.aggregate([
      {
        $match: {
          $and: [
            { department_id: department_id },
            { doctor_id: doctor_id },
            { appointment_staus: "conform" },
            { confrimed_date: date },
          ],
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "patient_id",
          foreignField: "patient_id",
          as: "data",
        },
      },
      // console.log(data),
      {
        $unwind: {
          path: "$data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          patient_id: 1,
          requested_date: 1,
          appointment_id: 1,
          doctor_name: 1,
          doctor_id: 1,
          department_id: 1,
          department_name: 1,
          appointment_staus: 1,
          confrimed_date: 1,
          "data.first_name": 1,
          "data.last_name": 1,
          "data.mobile_number": 1,
          "data.email": 1,
          "data.gender": 1,
          "data.dob": 1,
        },
      },
    ]);
    if (appointment) {
      return res.status(200).json({
        status: "success",
        message: "patients appointment fetched",
        result: appointment,
      });
    } else {
      return res.status(400).json({ status: "no data found" });
    }
  } catch (error) {
    console.log("error", error.message);
    return res.json({ message: error.message });
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

async function getAppointmenthistory(req, res, next) {
  try {
    console.log(req.query.specialist_id);
    console.log("data", req.query.patient_id);
    let id = req.query.specialist_id;
    let patient_id = req.query.patient_id;
    const find = await appointmentSchema
      .find({ doctor_id: id, patient_id, appointment_staus: "conform" })
      .exec();
    if (find) {
      console.log(find);
      return res.json({
        status: "success",
        message: "appointment denied",
        result: find,
      });
    } else {
      return res.json({
        status: "failure",
        message: "something went wrong",
      });
    }
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}
//get conformed appointment
async function getConformAppointment(req, res, next) {
  try {
    // date functions
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let AfterDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log(AfterDate);
    let newdate = new Date();
    newdate.setDate(newdate.getDate() - 1);
    let beforeDate =
      newdate.getFullYear() +
      "-" +
      (newdate.getMonth() + 1) +
      "-" +
      newdate.getDate();
    let todaydate = new Date();
    const current = moment(todaydate).format("YYYY-MM-DD");
    const find = await appointmentSchema.aggregate([
      {
        $match: {
          $and: [
            { appointment_staus: "conform" },
            {
              $or: [
                { confrimed_date: current },
                { confrimed_date: AfterDate },
                { confrimed_date: beforeDate },
              ],
            },
          ],
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "patient_id",
          foreignField: "patient_id",
          as: "data",
        },
      },
      {
        $unwind: {
          path: "$data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          "data.password": 0,
          "data.role": 0,
        },
      },
    ]);
    if (find) {
      console.log(find);
      return res.json({
        status: "success",
        message: "appointment datas",
        result: find,
        data: find.length,
      });
    } else {
      return res.json({
        status: "failure",
        message: "no data",
      });
    }
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}
export default {
  requestedappointment,
  getRequestedAppointment,
  Booked,
  confirmAppointment,
  denyAppointment,
  getTodayAppointment,
  getTodayApp,
  getAppointmenthistory,
  getConformAppointment,
};

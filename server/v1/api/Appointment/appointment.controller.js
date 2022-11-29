import Service from "./appointment.service.js";

async function requestedappointment(req, res, next) {
  await Service.requestedappointment(req.body, res, function (result) {
    console.log(result);
    return res.json({ message: result.message });
  });
}

async function Booked(req, res, next) {
  await Service.Booked(req.body, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getRequestedAppointment(req, res, next) {
  await Service.getRequestedAppointment(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function confirmAppointment(req, res, next) {
  await Service.confirmAppointment(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

export default {
  requestedappointment,
  getRequestedAppointment,
  Booked,
  confirmAppointment,
};

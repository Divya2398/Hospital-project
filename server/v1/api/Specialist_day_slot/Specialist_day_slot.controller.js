import Service from "./Specialist_day_slot.service.js";

async function addDaySlot(req, res) {
  await Service.addDaySlot(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getData(req, res) {
  await Service.getData(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getDataSlotDay(req, res) {
  await Service.getDataSlotDay(req.query, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getAvailableDay(req, res) {
  await Service.getAvailableDay(req.query, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getAvailableSlot(req, res) {
  await Service.getAvailableSlot(req.query, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function get_dept_doctor(req, res) {
  await Service.get_dept_doctor(req.query, res, function (result) {
    return res.json({ message: result.message });
  });
}

export default {
  addDaySlot,
  getData,
  getDataSlotDay,
  getAvailableDay,
  getAvailableSlot,
  get_dept_doctor,
};

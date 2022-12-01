import Service from "./Report.service.js";

async function addreport(req, res) {
  await Service.addreport(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getPatientReport(req, res) {
  await Service.getPatientReport(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getreport(req, res) {
  await Service.getreport(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

export default {
  addreport,
  getPatientReport,
  getreport,
};

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

async function patientReportId(req, res) {
  await Service.patientReportId(req, res, function (result) {
    return res.json({ message: result.message });
  });
}
async function checkpatienthistory(req, res) {
  await Service.checkpatienthistory(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function forpatientreport(req, res) {
  await Service.forpatientreport(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

export default {
  addreport,
  getPatientReport,
  getreport,
  patientReportId,
  checkpatienthistory,
  forpatientreport,
};

import Service from "./Report.service.js";

async function addreport(req, res) {
  await Service.addreport(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getDailyReport(req, res) {
  await Service.getDailyReport(req, res, function (result) {
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
  getDailyReport,
  getreport,
};

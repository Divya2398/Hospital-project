import reportSchema from "./Report.model.js";
import moment from "moment";

async function addreport(req, res) {
  console.log("res", req.body);
  try {
    const detail = req.body;
    let data = await reportSchema(detail).save();
    console.log("report", data);
    res.json({
      status: "success",
      message: "report added successfully",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "failed", message: error.message });
  }
}

async function getPatientReport(req, res) {
  try {
    let patient_id = req.query.patient_id;
    let doctor_id = req.query.doctor_id;
    let department_id = req.query.department_id;
    // let date = req.query.date;
    const report = await reportSchema
      .find({ patient_id, doctor_id, department_id })
      .exec();
    if (report.length > 0) {
      res.json({ status: "success", message: "reports fetched", data: report });
    } else {
      res.json({ status: "failure", message: "no data found" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "failed", message: error.message });
  }
}

async function getreport(req, res) {
  try {
    let patient_id = req.body.patient_id;
    let doctor_id = req.query.doctor_id;
    // let date = req.query.date;
    if (patient_id) {
      const find = await reportSchema.find({ patient_id, doctor_id }).exec();
      console.log("data", find);
      if (find) {
        res.json({ status: "success", message: "data fetched", data: find });
      } else {
        res.json({
          status: "failure",
          message: "no such patient or wrong patient_id",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "failed", message: error.message });
  }
}

export default {
  addreport,
  getPatientReport,
  getreport,
};

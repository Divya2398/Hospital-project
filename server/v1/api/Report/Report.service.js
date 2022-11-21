import reportSchema from "./Report.model.js";

async function addreport(req, res) {
  console.log("res", req);
  try {
    let data = await reportSchema(req).save();
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

async function getDailyReport(req, res) {
  try {
    let patient_id = req.query.patient_id;
    let doctor_id = req.query.doctor_id;
    let date = req.query.date;
    const report = await reportSchema
      .find({ patient_id, doctor_id, date })
      .exec();
    if (report) {
      res.json({ status: "success", message: "reports fetched", data: report });
    } else {
      res.json({ status: "no data", message: "no data found" });
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
  getDailyReport,
  getreport,
};

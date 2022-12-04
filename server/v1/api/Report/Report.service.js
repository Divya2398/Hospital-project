import reportSchema from "./Report.model.js";
import moment from "moment";
import userModel from "../User/user.model.js";

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

//get patient report based on doctor
async function checkpatienthistory(req, res) {
  try {
    let patient_id = req.body.patient_id;
    let doctor_id = req.query.doctor_id;
    let department_id = req.query.department_id;
    // let date = req.query.date;
    const report = await reportSchema
      .find({ patient_id, doctor_id, department_id })
      .exec();
    if (report) {
      res.json({
        status: "success",
        message: "reports fetched",
        data: report,
      });
      // if (report.length > 0) {
      //
      // } else {
      //   res.json({ status: "failure", message: "no data found" });
      // }
    } else {
      res.json({
        status: "failure",
        message: "no such patient log or wrong id",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "failed", message: error.message });
  }
}

//get department patient detail
async function patientReportId(req, res) {
  try {
    let patient_id = req.body.patient_id;
    let department_id = req.query.department_id;
    console.log(department_id);
    console.log(patient_id);
    const report = await reportSchema.aggregate([
      {
        $match: {
          $and: [{ patient_id: patient_id }, { department_id: department_id }],
        },
      },
      // {
      //   $group: {
      //     _id: { specialist_id: "$specialist_id" },
      //   },
      // },
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
      // {
      //   $project: {
      //     _id: 0,
      //     report_id: 1,
      //     patient_id: 1,
      //     appointment_id: 1,
      //     doctor_name: 1,
      //     doctor_id: 1,
      //     department_id: 1,
      //     department_name: 1,
      //     prescription: 1,
      //     date: 1,
      //     message: 1,
      //     "data.first_name": 1,
      //     "data.last_name": 1,
      //     "data.mobile_number": 1,
      //     "data.email": 1,
      //     "data.gender": 1,
      //     "data.dob": 1,
      //   },
      // },
    ]);
    if (report) {
      res.json({ status: "success", message: "reports fetched", data: report });
    } else {
      res.json({ status: "failure", message: "no data" });
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
  } catch (error) {}
}

export default {
  addreport,
  getPatientReport,
  getreport,
  patientReportId,
  checkpatienthistory,
};

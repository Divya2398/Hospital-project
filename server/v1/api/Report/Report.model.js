import mongoose from "mongoose";
import crypto from "crypto";
// import moment from 'moment';

const reportSchema = new mongoose.Schema(
  {
    report_id: { type: String, require: true },
    department_id: { type: String, require: true },
    specialist_name: { type: String },
    specialist_id: { type: String, require: true },
    patient_id: { type: String, require: true },
    date: { type: Date, require: true },
    appointment_id: { type: String },
    department_name: { type: String },
    message: { type: String, require: true },
    prescription: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

reportSchema.pre("save", function (next) {
  this.report_id =
    "REP-" + crypto.pseudoRandomBytes(3).toString("hex").toUpperCase();
  next();
});

export default mongoose.model("report", reportSchema);

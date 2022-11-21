import mongoose from "mongoose";
import crypto from "crypto";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, require: true, unique: true },
    doctor_name: { type: String, require: true },
    doctor_id: { type: String, require: true },
    department_id: { type: String, require: true },
    appoinment_date: { type: String, require: true },
    patient_id: { type: String, require: true },
    patient_name: { type: String, require: false },
    //    slot:{
    //     slot1 : {
    //         type : String
    //     },
    //     slot2 : {
    //         type : String
    //     },
    //     slot3 : {
    //         type : String
    //     },
    //     slot4 : {
    //         type : String
    //     },
    // },
    appointment_staus: {
      type: String,
      enum: ["pending", "booked", "deny", "conform"],
      require: false,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.pre("save", function (next) {
  this.appointmentId =
    "AP" + crypto.pseudoRandomBytes(2).toString("hex").toUpperCase();
  next();
});

export default mongoose.model("appointment", appointmentSchema);

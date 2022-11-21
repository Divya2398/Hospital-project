import mongoose from "mongoose";
import crypto from "crypto";
import moment from "moment";
import { type } from "os";

const specialistSchema = new mongoose.Schema(
  {
    specialist_id: { type: String, require: true, unique: true },
    department_id: { type: String, require: true },
    specialist_name: { type: String, require: true },
    department_name: { type: String },
    number: { type: String, require: false },
    specialisation: { type: String, require: true },
    available_day: [String],
    experience: { type: String, require: true },
    education: { type: String, require: true },
    time: { type: String, require: false },
    // available_slot: [String],
    password: { type: String, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

specialistSchema.pre("save", function (next) {
  this.specialist_id =
    "SPE-" + crypto.pseudoRandomBytes(2).toString("hex").toUpperCase();
  next();
  this.password = this.specialist_id;
});

export default mongoose.model("specialist", specialistSchema);

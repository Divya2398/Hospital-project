import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    patient_id: { type: String, require: true, unique: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    dob: { type: String, require: true },
    gender: { type: String, enum: ["male", "female", "others"] },
    mobile_number: { type: String, maxlength: 10, require: true },
    alternate_number: { type: String, maxlength: 10, required: false },
    email: { type: String, require: false },
    password: { type: String, require: true },
    otp: { type: String, require: false },
    patient_status: { type: String, require: false, default: "new_user" },
    patient_history: { type: Object, require: false },
    role: { type: String, require: false, default: "user" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.patient_id =
    "PA-" + crypto.pseudoRandomBytes(2).toString("hex").toUpperCase();
  next();
});

export default mongoose.model("user", userSchema, "user");

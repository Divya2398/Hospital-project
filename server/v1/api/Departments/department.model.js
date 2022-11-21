import mongoose from "mongoose";
import crypto from "crypto";

const departmentSchema = new mongoose.Schema(
  {
    department_id: { type: String, require: true, unique: true },
    department_name: { type: String, require: true },
    password: { type: String, require: true },
    department_image: { type: String, require: true },
    role: { type: String, require: false, default: "department" },
  },
  {
    timestamps: true,
  }
);

departmentSchema.pre("save", function (next) {
  this.department_id =
    "DEP-" + crypto.pseudoRandomBytes(2).toString("hex").toUpperCase();
  next();
});

export default mongoose.model("department", departmentSchema);

import mongoose from "mongoose";
import crypto from "crypto";

const contactSchema = new mongoose.Schema(
  {
    contact_id: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: String, require: true },
    query_type: {
      type: String,
      require: true,
      enum: ["feedback", "query", "complaint"],
    },
    message: { type: String, require: true },
    reply_status: { type: Boolean, require: false, default: false },
  },
  {
    timestamps: true,
  }
);

contactSchema.pre("save", function (next) {
  this.contact_id =
    "query-" + crypto.pseudoRandomBytes(3).toString("hex").toUpperCase();
  next();
});

export default mongoose.model("contact", contactSchema);

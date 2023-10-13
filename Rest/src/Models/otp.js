const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otp = new Schema(
  {
    otp: { type: String, required: true, trim: true },
    expireIn: { type: String, required: true, trim: true },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTPModel = mongoose.model("OTPs", otp);

module.exports = {
  schema: otp,
  model: OTPModel,
};

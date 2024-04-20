const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const phoneSchema = mongoose.Schema(
  {
    phone: {
        type: String,
        default: "",
      },
    otp: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
phoneSchema.plugin(toJSON);
phoneSchema.plugin(paginate);

const PhoneOtpVerifySchema = mongoose.model("phone-verify-otp", phoneSchema);

module.exports = PhoneOtpVerifySchema;

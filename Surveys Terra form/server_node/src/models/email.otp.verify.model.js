const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");

const emailSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
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
emailSchema.plugin(toJSON);
emailSchema.plugin(paginate);

const EmailOtpVerifySchema = mongoose.model("email-verify-otp", emailSchema);

module.exports = EmailOtpVerifySchema;
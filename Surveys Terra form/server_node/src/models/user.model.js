const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
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
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    zip_code: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      default: "",
    },
    race: {
      type: String,
      default: "",
    },
    ethnicity: {
      type: String,
      default: "",
    },
    marital_status: {
      type: String,
      default: "",
    },
    income: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    sports: {
      type: String,
      default: "",
    },
    athletics: {
      type: String,
      default: "",
    },
    climbing: {
      type: String,
      default: "",
    },
    party: {
      type: String,
      default: "",
    },
    outing: {
      type: String,
      default: "",
    },
    cycling: {
      type: String,
      default: "",
    },
    paypal_id: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    profile_image: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: "",
    },
    admin_created_by:{
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    is_accept_terms_and_conditions: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, isDelete: false, _id: { $ne: excludeUserId } });
  return !!user;
};
userSchema.statics.isEmailTakenAdmin = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    role: "admin",
    isDelete: false,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};
userSchema.statics.isPhoneNumberTaken = async function (phone, excludeUserId) {
  const user = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!user;
};
/*
 * Check if password matches the user's password
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

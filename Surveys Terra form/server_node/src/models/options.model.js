var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StateOptionSchema = new Schema(
  {
    name: { type: String, required: true },
    abbreviation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);
var countryOptionSchema = new Schema(
  {
    name: { type: String, required: true },
    abbreviation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);


const SportsOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);
const RaceOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);

const EthnicityOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);

const IncomeStatusOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);
const AthleticsStatusOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);
const PartyStatusOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
  }
);
// Create models
const StateOption = mongoose.model("state-option", StateOptionSchema);
const countryOption = mongoose.model("country-option", countryOptionSchema);
const SportsOption = mongoose.model("sports-option", SportsOptionSchema);
const RaceOption = mongoose.model("race-option", RaceOptionSchema);
const EthnicityOption = mongoose.model(
  "ethnicity-option",
  EthnicityOptionSchema
);

const IncomeStatusOption = mongoose.model(
  "incomeStatus-option",
  IncomeStatusOptionSchema
);
const AthleticsStatusOption = mongoose.model(
  "athleticsStatus-option",
  AthleticsStatusOptionSchema
);
const PartyStatusOption = mongoose.model(
  "partyStatus-option",
  PartyStatusOptionSchema
);

module.exports = {
  StateOption,
  countryOption,
  SportsOption,
  RaceOption,
  EthnicityOption,
  IncomeStatusOption,
  AthleticsStatusOption,
  PartyStatusOption,
};

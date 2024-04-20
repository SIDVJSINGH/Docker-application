const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {rewardCategorySchema} = require('../models/reward.management.model');

const surveyCategorySchema = new Schema({
    title: { type: String, default: "" },
    survey_type_id: { type: Schema.Types.ObjectId, ref: "survey-type-category-schema"},
    survey_description: { type: String, default: "" },
    survey_tag_id: { type: Schema.Types.ObjectId, ref: "survey-tag-category-schema"},
    start_date_time: { type: String, default: "" },
    end_date_time: { type: String, default: "" },
    complete_time: { type: String, default: "" },
    min_age_range: { type: Number },
    max_age_range: { type: Number },
    url: { type: String, default: "" },
    image: {type: String, default: "" },
    participants_list: [rewardCategorySchema],
    isActive:{type: Boolean,default: true},
    isStatusComplete:{type: Boolean,default: false},
    isDelete:{type: Boolean,default: false},
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true }
});

module.exports = {
    model: mongoose.model('survey-category-schema', surveyCategorySchema)
};
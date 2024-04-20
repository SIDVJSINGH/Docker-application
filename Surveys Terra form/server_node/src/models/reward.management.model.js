const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const rewardCategorySchema = new Schema({
    survey_id: {type: Schema.Types.ObjectId, ref: "survey-category-schema"},
    user_id: { type: Schema.Types.ObjectId, ref: "User"},
    survey_participate_status :{type: Boolean,default: false},
    submitted_date_time: { type: String, default: "" },
    status: { type: String, enum :["completed", "ongoing", "rejected"] ,default: "ongoing" },
    reward_status: { type: String, enum :["paid", "unpaid"], default: "unpaid"},
    reward_earned_value: { type: Number, default: 0 },
    isActive:{type: Boolean,default: true},
    isDelete:{type: Boolean,default: false}
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true }
});

module.exports = {
    rewardCategorySchema,
    model: mongoose.model('reward-category-schema', rewardCategorySchema),
};
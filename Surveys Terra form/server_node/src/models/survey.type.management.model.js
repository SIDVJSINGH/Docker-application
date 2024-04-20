const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const surveyTypeCategorySchema = new Schema({
    type_name: { type: String, default: "" },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true }
});

module.exports = {
    model: mongoose.model('survey-type-category-schema', surveyTypeCategorySchema)
};
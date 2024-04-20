var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CmsPageSchema   = new Schema({
    name: {type: String, required: true},
    title: String,
    content: {
        type: String,
        default: ""
    },
    images:[String],
    description: {type: String, default: ""},
    email: {type: String, default: ""},
},{
    timestamps: { createdAt: 'created_at',updatedAt:'updated_at' },
    toJSON: { virtuals: true }
});

const ContactSchema   = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    isDelete: {type: Boolean, default: false}
},{
    timestamps: { createdAt: 'created_at',updatedAt:'updated_at' },
    toJSON: { virtuals: true }
});

const SocialLinkSchema   = new Schema({
    linkedin_link: {type: String, required: true},
    threads_link: {type: String, required: true},
    isDelete: {type: Boolean, default: false}
},{
    timestamps: { createdAt: 'created_at',updatedAt:'updated_at' },
    toJSON: { virtuals: true }
});
// Create models
const CmsPage = mongoose.model('cms-page', CmsPageSchema);
const Contact = mongoose.model('contact-us', ContactSchema);
const SocialLink = mongoose.model('social-link', SocialLinkSchema);

module.exports = {
    CmsPage,
    Contact,
    SocialLink,
};
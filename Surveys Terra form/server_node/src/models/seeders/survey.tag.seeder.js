const SurveyTag = require("../survey.tag.management.model");

module.exports = async () => {
    let count = await SurveyTag.model.estimatedDocumentCount().exec();
    if (!count) {
        await SurveyTag.model.create([
            {
                tag_name: "Entertainment",
                image: "",
                isActive: true,
                isDelete: false,
            },
            {
                tag_name: "Shopping",
                image: "",
                isActive: true,
                isDelete: false,
            },
            {
                tag_name: "Event",
                image: "",
                isActive: true,
                isDelete: false,
            },
            {
                tag_name: "Party",
                image: "",
                isActive: true,
                isDelete: false,
            },
            {
                tag_name: "Politics",
                image: "",
                isActive: true,
                isDelete: false,
            },
            {
                tag_name: "Religious",
                image: "",
                isActive: true,
                isDelete: false,
            },
            {
                tag_name: "General",
                image: "",
                isActive: true,
                isDelete: false,
            },
        ]);
    }
    return true;
};

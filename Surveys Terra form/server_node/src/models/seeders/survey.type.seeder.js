const SurveyType = require("../survey.type.management.model");

module.exports = async () => {
  let count = await SurveyType.model.estimatedDocumentCount().exec();
  if (!count) {
    await SurveyType.model.create([
      {
        type_name: "Product feedback surveys",
        image: "",
        isActive: true,
        isDelete: false,
      },
      {
        type_name: "Market research surveys",
        image: "",
        isActive: true,
        isDelete: false,
      },
      {
        type_name: "Customer service feedback",
        image: "",
        isActive: true,
        isDelete: false,
      },
    ]);
  }
  return true;
};

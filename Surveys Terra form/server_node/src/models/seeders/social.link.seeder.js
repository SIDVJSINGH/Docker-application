var { SocialLink } = require("../cms.model");

module.exports = async () => {
  let count = await SocialLink.estimatedDocumentCount().exec();
  if (!count) {
    await SocialLink.create([
      {
        linkedin_link: "https://www.linkedin.com/home",
        threads_link: "https://www.threads.net/login",
        isDelete: false,
      }
    ]);
  }
  return true;
};

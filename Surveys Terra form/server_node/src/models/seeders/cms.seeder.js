var { CmsPage } = require("../cms.model");

module.exports = async () => {
  let count = await CmsPage.estimatedDocumentCount().exec();
  if (!count) {
    await CmsPage.create([
      {
        name: "privacy-policy",
        content:
          "<p>Our website application, Survey website, values your privacy and is committed to protecting your personal information.. We also gather non-personal information like device details and usage data to enhance app functionality and performance.</p>",
        title: "Privacy Policy",
      },
      {
        name: "terms",
        content:
          "<p>By downloading, installing, and using the Survey website application, you agree to comply with the following terms and conditions. The application is provided on an as is basis, and we do not guarantee its accuracy, reliability, or suitability for your specific needs.</p>",
        title: "Terms & Conditions for Customers",
      },
      {
        name: "about-us",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Learjet sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Lauds PageMaker including versions of Lorem Ipsum.</p>",
        title: "About Us"
      },
    //   {
    //     name: "faq",
    //     content: "<p>FAQ</p>",
    //     title: "Fequently Asked Questions",
    //   },
      {
        name: "welcome-message-customer",
        content: "Welcome",
        title: "Customer Welcome Message",
      },
      {
        name: "contact-us",
        title: "Contact Us",
        description: "<p>You can contact us on the following email address.</p>",
        email: "johndoe@gmail.com",
      }
    ]);
  }
  return true;
};

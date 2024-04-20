const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");
// const {userEmailVerificationByOtp, testFunc} = require("./user.service")
// const authService = require("../services/auth.service")
const userService = require("./user.service");

const transport = nodemailer.createTransport(config.email.smtp);
// const transport = nodemailer.createTransport({
//   host: "smtp.office365.com",
//   port: 587,
//   secure: false, // Use false for STARTTLS
//   auth: {
//     user: "contact@surveysterra.com", // Your Office 365 email address
//     pass: "Padillaponce1985", // Your Office 365 password or an app-specific password
//   },
// });

function generateCustomCode(count) {
    let dateTime = new Date().toISOString().replace(/[^\d]/g, "");
    let str = "0123456789" + dateTime;
    var chars = str.split("");
    var result = "";
    for (var i = 0; i < count; i++) {
        var x = Math.floor(Math.random() * chars.length);
        result += chars[x];
    }
    return result.toUpperCase();
}

if (config.env !== "test") {
    transport
        .verify()
        .then(() => logger.info("Connected to email server"))
        .catch((e) =>
            logger.warn(
                "Unable to connect to email server. Make sure you have configured the SMTP options in .env" + e
            )
        );
}

const sendEmail = async (to, subject, text) => {
    const msg = { from: config.email.from, to, subject, text };
    await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
    const subject = "Reset password";
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
    const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
    await sendEmail(to, subject, text);
};

const sendVerificationEmail = async (to) => {
    const subject = "Email Verification";
    const otp = generateCustomCode(6);

    let mailOptions = {
        from: config.email.from,
        to: to,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 400""="">
                            <table class="col-600" width="600" height="250" border="0" align="center" cellpadding="0" cellspacing="0">

                                <tbody><tr>
                                    <td height="40"></td>
                                </tr>


                                <tr>
                                    <td align="center" style="line-height: 0px;">
                                        <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="200" alt="logo">
                                    </td>
                                </tr>
                                <tr>
                                    <td height="50"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">OTP Verification</td>
                        </tr>
                        <tr>
                            <td height="20"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:18px; font-weight: bold; color:#2a3a4b;">Hello, User</td>
                        </tr>
                        <tr>
                            <td height="30"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                Please use the following OTP to verify your account:
                            </td>
                        </tr>
                        <tr>
                            <td height="5"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                <h2 style="display: inline-block; background: #5AA81C; margin: 0; padding: 10px 20px; color: #fff; border-radius: 4px;">${otp}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td height="50"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                Please do not share it with anybody.<br>If you didn't request for this OTP, you can ignore this email, Thank you!
                            </td>
                        </tr>
                        <tr>
                            <td height="10"></td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                    <tbody>
                                        
                                        <tr>
                                            <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">
                                                
                                                <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        // console.log(to,otp,'+++++++++++++++###');
        // console.log(typeof to,typeof otp,'+++++++++++++++###Type');
        // const otpinsret = userService.sendVerificationEmail(to, otp);
        const otpinsret = userService.testFunc(to, otp);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

const sendForgotOtpEmail = async (to, fullname, userId) => {
    const subject = "Forgot Password Verification";
    const otp = generateCustomCode(6);

    let mailOptions = {
        from: config.email.from,
        to: to,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 400""="">
                            <table class="col-600" width="600" height="250" border="0" align="center" cellpadding="0" cellspacing="0">

                                <tbody><tr>
                                    <td height="40"></td>
                                </tr>


                                <tr>
                                    <td align="center" style="line-height: 0px;">
                                        <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="200" alt="logo">
                                    </td>
                                </tr>
                                <tr>
                                    <td height="50"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">OTP Verification</td>
                        </tr>
                        <tr>
                            <td height="20"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:18px; font-weight: bold; color:#2a3a4b;">Hello, ${fullname}</td>
                        </tr>
                        <tr>
                            <td height="30"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                Please use the following OTP to verify your account:
                            </td>
                        </tr>
                        <tr>
                            <td height="5"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                <h2 style="display: inline-block; background: #5AA81C; margin: 0; padding: 10px 20px; color: #fff; border-radius: 4px;">${otp}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td height="50"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                If you didn't request this OTP, you can ignore this email, Thank you!
                            </td>
                        </tr>
                        <tr>
                            <td height="10"></td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                    <tbody>
                                        
                                        <tr>
                                            <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">
                                                
                                                <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        const otpinsret = await userService.updateOtpUserFunc(userId, otp);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

const sendNewUserEmailNotification = async (userEmail, to) => {
    const subject = "New User Registration Notification";

    let mailOptions = {
        from: config.email.from,
        to: to,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td align="center">
                    <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tbody><tr>
                            <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 300""="">
                                <table class="col-600" width="auto"  border="0" align="center" cellpadding="0" cellspacing="0">
    
                                    <tbody>
    
    
                                    <tr>
                                        <td align="center" style="line-height: 0px;">
                                            <img style="display:block; height: 250px; width: auto;line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="100" alt="logo">
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                        <tbody>
                            
                            <tr>
                                <td height="30"></td>
                            </tr>
                            <tr>
                              <td style="padding-left: 20px;">
                                  <p>Dear Admin,</p>
                                  <p>A new user has registered on your website.</p>
                                  <p><strong> Email:</strong> ${userEmail}</p>
                                  <p> Please check this account email in your admin dashboard.</p>
                                  <p>&nbsp;</p>
                                  <p>&nbsp;</p>
                                  <p>Thank you,</p>
                                  <p><strong>Admin Team</strong></p>
                              </td>
                            </tr>
                            
                            <tr>
                                <td height="10"></td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                        <tbody>
                                            
                                            <tr>
                                                <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">
                                                    
                                                    <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

const sendSurveyDeclinedByAdminToUSer = async (to, fullname, surveyTitle) => {
    const subject = "The survey has been rejected by the admin.";

    let mailOptions = {
        from: config.email.from,
        to: to,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 400""="">
                            <table class="col-600" width="600" height="250" border="0" align="center" cellpadding="0" cellspacing="0">

                                <tbody><tr>
                                    <td height="40"></td>
                                </tr>


                                <tr>
                                    <td align="center" style="line-height: 0px;">
                                        <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="200" alt="logo">
                                    </td>
                                </tr>
                                <tr>
                                    <td height="50"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">OTP Verification</td>
                        </tr>
                        <tr>
                            <td height="20"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:18px; font-weight: bold; color:#2a3a4b;">Hello, ${fullname}</td>
                        </tr>
                        <tr>
                            <td height="30"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                You have participate on this survey :${surveyTitle}
                            </td>
                        </tr>
                        <tr>
                            <td height="5"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                <h2 style="display: inline-block; background: #ff5561; margin: 0; padding: 10px 20px; color: #fff; border-radius: 4px;">Rejected</h2>
                            </td>
                        </tr>
                        <tr>
                            <td height="50"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                Thank you for using Survey Management Website!
                            </td>
                        </tr>
                        <tr>
                            <td height="10"></td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                    <tbody>
                                        
                                        <tr>
                                            <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">
                                                
                                                <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

const sendSurveyRewardAddedByAdminToUSer = async (
    to,
    fullname,
    surveyTitle,
    rewardEarnedValue
) => {
    const subject =
        "An additional reward has been granted by the admin for a survey.";

    let mailOptions = {
        from: config.email.from,
        to: to,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 400""="">
                            <table class="col-600" width="600" height="250" border="0" align="center" cellpadding="0" cellspacing="0">

                                <tbody><tr>
                                    <td height="40"></td>
                                </tr>


                                <tr>
                                    <td align="center" style="line-height: 0px;">
                                        <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="200" alt="logo">
                                    </td>
                                </tr>
                                <tr>
                                    <td height="50"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">OTP Verification</td>
                        </tr>
                        <tr>
                            <td height="20"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:18px; font-weight: bold; color:#2a3a4b;">Hello, ${fullname}</td>
                        </tr>
                        <tr>
                            <td height="30"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                You have participate on this survey :${surveyTitle} has been completed by admin. Also he gave a reward amount is:
                            </td>
                        </tr>
                        <tr>
                            <td height="5"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                <h2 style="display: inline-block; background: #008f3d; margin: 0; padding: 10px 20px; color: #fff; border-radius: 4px;">${rewardEarnedValue}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td height="50"></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                Thank you for using Survey Management Website!
                            </td>
                        </tr>
                        <tr>
                            <td height="10"></td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                    <tbody>
                                        
                                        <tr>
                                            <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">
                                                
                                                <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

const sendContactDataToAdmin = async (surveyEmail, name, email, message) => {
    const subject = "User contact us";

    let mailOptions = {
        from: config.email.from,
        to: surveyEmail,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td align="center">
                    <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tbody><tr>
                            <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 300""="">
                                <table class="col-600" width="auto"  border="0" align="center" cellpadding="0" cellspacing="0">
    
                                    <tbody>
    
    
                                    <tr>
                                        <td align="center" style="line-height: 0px;">
                                            <img style="display:block; height: 250px; width: auto;line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="100" alt="logo">
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                        <tbody>
                            
                            <tr>
                                <td height="30"></td>
                            </tr>
                            <tr>
                              <td style="padding-left: 20px;">
                                  <p>Dear Admin,</p>
                                  <p>A contact us form submission has been made with the following details:</p>
                                  <p><strong> Name:</strong> ${name}</p>
                                  <p><strong> Email:</strong> ${email}</p>
                                  <p><strong> Message:</strong></p>
                                  <p> ${message}</p>
                              </td>
                            </tr>
                            
                            <tr>
                                <td height="10"></td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                        <tbody>
                                            
                                            <tr>
                                                <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">
                                                    
                                                    <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

const sendContactDataToUser = async (userEmail, name) => {
    const subject = "User contact us";

    let mailOptions = {
        from: config.email.from,
        to: userEmail,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td align="center">
                    <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tbody><tr>
                            <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 300""="">
                                <table class="col-600" width="auto"  border="0" align="center" cellpadding="0" cellspacing="0">
    
                                    <tbody>
    
    
                                    <tr>
                                        <td align="center" style="line-height: 0px;">
                                            <img style="display:block; height: 250px; width: auto;line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="100" alt="logo">
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                        <tbody>
                            
                            <tr>
                                <td height="30"></td>
                            </tr>
                            <tr>
                              <td style="padding-left: 20px;">
                                  <p>Hi ${name},<p>
                                      <p><strong>Thank you for contacting us.</strong></p>
                                      
                                      <p>We have received your inquiry and will respond to you very soon. </p>
                                      <p>&nbsp;</p>
                                      <p>&nbsp;</p>
                                      <p>Thank you,</p>
                                      <p><strong>Admin Team</strong></p>
                              </td>
                            </tr>
                            
                            <tr>
                                <td height="10"></td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                        <tbody>
                                            
                                            <tr>
                                                <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">
                                                    
                                                    <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

const sendAdminDataToAdminUser = async (userAdminEmail, userAdminName, userAdminPassw) => {
    const subject = "New admin user has been successfully registered";

    let mailOptions = {
        from: config.email.from,
        to: userAdminEmail,
        subject: subject,
        html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td align="center">
                    <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tbody><tr>
                            <td align="center" valign="top" bgcolor="#E9E9E9" style="background-size:cover; background-position:top;height=" 300""="">
                            <table class="col-600" width="auto" border="0" align="center" cellpadding="0" cellspacing="0">

                                <tbody>


                                    <tr>
                                        <td align="center" style="line-height: 0px;">
                                            <img style="display:block; height: 250px; width: auto;line-height:0px; font-size:0px; border:0px;" src="https://nodeserver.mydevfactory.com:6009/uploads/app-logo-image/surveys_terra.png" width="300" height="100" alt="logo">
                                        </td>
                                    </tr>
                                </tbody></table>
                        </td>
                        </tr>
                    </tbody></table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>

                        <tr>
                            <td height="30"></td>
                        </tr>
                        <tr>
                            <td style="padding-left: 20px;">
                                <p>Dear ${userAdminName},<p>
                                    <p><strong>Thank you for contacting us.</strong></p>

                                    <p>Your admin account was created. Please enter the below Email and Password to login to the admin panel. </p>
                                    <p><strong> Email:</strong> ${userAdminEmail}</p>
                                    <p><strong> Password:</strong> ${userAdminPassw}</p>
                                    <p>&nbsp;</p>
                                    <p>&nbsp;</p>
                                    <p>Thank you,</p>
                                    <p><strong>Admin Team</strong></p>
                                </td>
                                </tr>

                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                            <tbody>

                                                <tr>
                                                    <td align="center" bgcolor="#E9E9E9" background="#00466a" height="100">

                                                        <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                            <tbody>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
    </table>`,
    };
    try {
        await transport.sendMail(mailOptions);
        return true;
    } catch (e) {
        // console.log("errrement:-----", e);
        return false;
    }
};

module.exports = {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail,
    sendForgotOtpEmail,
    sendNewUserEmailNotification,
    sendSurveyDeclinedByAdminToUSer,
    sendSurveyRewardAddedByAdminToUSer,
    sendContactDataToAdmin,
    sendContactDataToUser,
    sendAdminDataToAdminUser,
};

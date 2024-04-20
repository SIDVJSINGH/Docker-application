const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
let responseLanguageValue = 'english';

function setResponseLanguage(value) {
  responseLanguageValue = value;
}

function getResponseLanguage() {
  return responseLanguageValue;
}

module.exports = {
  setResponseLanguage,
  getResponseLanguage,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: false,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  fcm_auth: {
    "type": envVars.FIREBASE_AUTH_TYPE,
    "project_id": envVars.FIREBASE_AUTH_PROJECT_ID,
    "private_key_id": envVars.FIREBASE_AUTH_PROJECT_KEY_ID,
    "private_key": envVars.FIREBASE_AUTH_PRIVATE_KEY,
    "client_email": envVars.FIREBASE_AUTH_CLIENT_EMAIL,
    "client_id": envVars.FIREBASE_AUTH_CLIENT_ID,
    "auth_uri": envVars.FIREBASE_AUTH_AUTH_URI,
    "token_uri": envVars.FIREBASE_AUTH_TOKEN_URI,
    "auth_provider_x509_cert_url": envVars.FIREBASE_AUTH_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": envVars.FIREBASE_AUTH_CLIENT_X509_CERT_URL,
    "universe_domain": envVars.FIREBASE_AUTH_UNIVERSE_DOMAIN
  },
  base_url:envVars.BASE_URL,
  account_sid:envVars.ACCOUNT_SID,
  auth_token:envVars.AuthTOKEN,
  twilio_from_number:envVars.TWILIO_FROM_NUMBER,
  twilio_to_number:envVars.TWILIO_TO_NUMBER,
  survey_smtp_email: envVars.SURVEY_SMTP_EMAIL,
};

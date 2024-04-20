const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const cmsSeeder = require("./models/seeders/cms.seeder");
const socialLinkSeeder = require("./models/seeders/social.link.seeder");
const surveyTypeSeeder = require("./models/seeders/survey.type.seeder");
const surveyTagSeeder = require("./models/seeders/survey.tag.seeder");
const optionsSeeder = require("./models/seeders/options.seeder");




let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  cmsSeeder()
    .then(() => {
      logger.info("cms seeded successfully");
    })
    .catch((err) => {
      logger.error("Error seeding schema:", err);
    });
  socialLinkSeeder()
    .then(() => {
      logger.info("social link data seeded successfully");
    })
    .catch((err) => {
      logger.error("Error seeding schema:", err);
    });
  surveyTypeSeeder()
    .then(() => {
      logger.info("survey type data seeded successfully");
    })
    .catch((err) => {
      logger.error("Error seeding schema:", err);
    });
  surveyTagSeeder()
    .then(() => {
      logger.info("survey tag/category data seeded successfully");
    })
    .catch((err) => {
      logger.error("Error seeding schema:", err);
    });
  optionsSeeder()
    .then(() => {
      logger.info("Options seeded successfully");
    })
    .catch((err) => {
      logger.error("Error seeding schema:", err);
    });
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

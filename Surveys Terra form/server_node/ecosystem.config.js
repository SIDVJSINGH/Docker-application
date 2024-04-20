module.exports = {
  apps: [
    {
      name: 'survey-website-developement',
      script: 'src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
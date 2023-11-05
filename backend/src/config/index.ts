export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  dbUrl: process.env.MONGO_URL,
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    email: process.env.SENDGRID_EMAIL
  },
  logLevel: process.env.LOG_LEVEL,
};

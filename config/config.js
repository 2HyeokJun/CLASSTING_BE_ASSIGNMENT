require('dotenv').config();

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  timezone: "+09:00",
};

const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  timezone: "+09:00",
};

const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_TEST,
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  timezone: "+09:00",
};

module.exports = { development, production, test };
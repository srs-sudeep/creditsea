import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  MONGODB_URL: Joi.string().required().description('MongoDB URL'),
  SERVER_URL: Joi.string().default('http://localhost:5000').description('Server URL'),
  CLIENT_URL: Joi.string().default('http://localhost:5173').description('Client URL'),
  JSON_WEB_TOKEN_SECRET: Joi.string().required().description('JWT secret key'),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  mongodb: {
    url: envVars.MONGODB_URL,
  },
  server: {
    url: envVars.SERVER_URL,
  },
  client: {
    url: envVars.CLIENT_URL,
  },
  jsonWebTokenSecret: envVars.JSON_WEB_TOKEN_SECRET,
};

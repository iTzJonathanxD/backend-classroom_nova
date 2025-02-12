import * as dotenv from 'dotenv';
import { EnvVars } from '../utils/index';
import * as joi from 'joi';

dotenv.config(); 

export const envSchema = joi.object({
  PORT: joi.number().required(),
  MONGO_URI: joi.string().required(),
}).unknown(true); 

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
};
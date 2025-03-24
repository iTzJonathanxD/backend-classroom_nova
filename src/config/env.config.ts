import * as dotenv from 'dotenv';
import { EnvVars } from '../common/interfaces/env.interface';
import Joi, * as joi from 'joi';

dotenv.config(); 

export const envSchema = joi.object({
  PORT: joi.number().required(),
  MONGO_URI: joi.string().required(),
  TOKEN_SECRETKEY: joi.string().required(),
  CORS_ORIGIN: joi.string().required(),
  SSL_ENABLED: joi.boolean().default(false),
  SSL_KEY_PATH: joi.string().default(''),
  SSL_CERT_PATH: joi.string().default('')
}).unknown(true); 

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwt: envVars.TOKEN_SECRETKEY,
  corsOrigin: envVars.CORS_ORIGIN,
  ssl: {
    enabled: envVars.SSL_ENABLED,
    keyPath: envVars.SSL_KEY_PATH,
    certPath: envVars.SSL_CERT_PATH,
  },
};

export const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
export const IMAGE_GENERATION_MODEL = process.env.IMAGE_GENERATION_MODEL || 'default-image-model';
export const VISION_MODEL = process.env.VISION_MODEL || 'default-vision-model';
export const TEXT_GENERATION_MODEL = process.env.TEXT_GENERATION_MODEL || 'default-text-model';
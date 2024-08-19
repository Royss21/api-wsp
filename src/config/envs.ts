import 'dotenv/config';
import * as joi from 'joi';
import { IEnvVars } from './interfaces/env-vars.interface';

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    STAGE: joi.string().required(),
    APP_VERSION: joi.string().required(),
    CLIENT_BROWSER: joi.string().required(),
    CLIENT_VERSION: joi.string().required(),
    INSTANCE_MAX_RETRY_QR: joi.number().required(),
    INSTANCE_MAX_CONNECTION_RETRIES: joi.number().required(),
    MONGO_URL: joi.string().required(),
    MONGO_DBNAME: joi.string().required(),
    WEBHOOK_ENABLED: joi.boolean().required(),
    WEBHOOK_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: IEnvVars = value;

export const envs = {
  port: envVars.PORT,
  stage: envVars.STAGE,
  app_version: envVars.APP_VERSION,
  client_browser: envVars.CLIENT_BROWSER,
  client_version: envVars.CLIENT_VERSION,
  instance_max_retry_qr: envVars.INSTANCE_MAX_RETRY_QR,
  instance_max_connection_retries: envVars.INSTANCE_MAX_CONNECTION_RETRIES,
  mongo_url: envVars.MONGO_URL,
  mongo_dbname: envVars.MONGO_DBNAME,
  webhook_enabled: envVars.WEBHOOK_ENABLED,
  webhook_url: envVars.WEBHOOK_URL,
};

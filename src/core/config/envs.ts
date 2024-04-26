import 'dotenv/config';
import * as joi from 'joi';
import { IEnvVars } from '../interfaces';

const envSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: IEnvVars = value;

export const envs = {
  port: envVars.PORT,
  app_url: envVars.APP_URL,

  client_platform: envVars.CLIENT_PLATFORM,
  client_browser: envVars.CLIENT_BROWSER,
  client_version: envVars.CLIENT_VERSION,

  instance_max_retry_qr: envVars.INSTANCE_MAX_RETRY_QR,
  instance_max_connection_retries: envVars.INSTANCE_MAX_CONNECTION_RETRIES,
  instance_name_schema: envVars.INSTANCE_NAME_SCHEMA,

  mongo_url: envVars.MONGO_URL,
  mongo_dbname: envVars.MONGO_DBNAME,
  mongo_instance_url: envVars.MONGO_INSTANCE_URL,
  mongo_instance_dbname: envVars.MONGO_INSTANCE_DBNAME,

  webhook_enabled: envVars.WEBHOOK_ENABLED,
  webhook_url: envVars.WEBHOOK_URL,
  webhook_base64: envVars.WEBHOOK_BASE64,
  webhook_allowed_events: envVars.WEBHOOK_ALLOWED_EVENTS,
};

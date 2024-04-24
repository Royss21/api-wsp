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
  mongodb_enabled: envVars.MONGODB_ENABLED,
  mongodb_url: envVars.MONGODB_URL,
  mongodb_bdname: envVars.MONGODB_BDNAME,
  webhook_enabled: envVars.WEBHOOK_ENABLED,
  webhook_url: envVars.WEBHOOK_URL,
  webhook_base64: envVars.WEBHOOK_BASE64,
  webhook_allowed_events: envVars.WEBHOOK_ALLOWED_EVENTS,
};

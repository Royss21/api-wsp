export interface IEnvVars {
  TOKEN: string;
  PROTECT_ROUTES: boolean;

  PORT: number;
  APP_URL: string;

  CLIENT_PLATFORM: string;
  CLIENT_BROWSER: string;
  CLIENT_VERSION: string;

  INSTANCE_MAX_RETRY_QR: number;
  INSTANCE_MAX_CONNECTION_RETRIES: number;
  INSTANCE_NAME_SCHEMA: string;

  MONGODB_ENABLED: boolean;
  MONGODB_URL: string;
  MONGODB_BDNAME: string;

  WEBHOOK_ENABLED: boolean;
  WEBHOOK_URL: string;
  WEBHOOK_BASE64: boolean;
  WEBHOOK_ALLOWED_EVENTS: string;
}

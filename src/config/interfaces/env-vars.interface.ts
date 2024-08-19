export interface IEnvVars {
  PORT: number;
  STAGE: string;
  APP_VERSION: string;

  CLIENT_BROWSER: string;
  CLIENT_VERSION: string;

  INSTANCE_MAX_RETRY_QR: number;
  INSTANCE_MAX_CONNECTION_RETRIES: number;

  MONGO_URL: string;
  MONGO_DBNAME: string;

  WEBHOOK_ENABLED: boolean;
  WEBHOOK_URL: string;
}

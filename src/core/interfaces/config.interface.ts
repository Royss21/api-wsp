export interface IConfig {
  port: number;
  token: string;
  restoreSessionsOnStartup: boolean;
  appUrl: string;
  log: {
    level: string;
  };
  instance: {
    maxRetryQr: number;
  };
  mongoose: {
    enabled: boolean;
    url: string;
    dbName: string;
    options: {
      // useCreateIndex: true,
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
    };
  };
  browser: {
    platform: string;
    browser: string;
    version: string;
  };
  webhookEnabled: boolean;
  webhookUrl: string;
  webhookBase64: boolean;
  protectRoutes: boolean;
  markMessagesRead: boolean;
  webhookAllowedEvents: string[];
}

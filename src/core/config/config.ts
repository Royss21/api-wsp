export class Config {
  static readonly port = (process.env.PORT || 3333) as number;
  static readonly token = process.env.TOKEN || '';
  static readonly restoreSessionsOnStartup = !!(
    process.env.RESTORE_SESSIONS_ON_START_UP &&
    process.env.RESTORE_SESSIONS_ON_START_UP === 'true'
  );
  static readonly appUrl = process.env.APP_URL || '';
  static readonly log = { level: process.env.LOG_LEVEL };
  static readonly instance = {
    maxRetryQr: (process.env.INSTANCE_MAX_RETRY_QR || 2) as number,
  };
  static readonly mongoose = {
    enabled: !!(
      process.env.MONGODB_ENABLED && process.env.MONGODB_ENABLED === 'true'
    ),
    dbName: process.env.MONGODB_BDNAME,
    url:
      process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/WhatsAppInstance',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
  static readonly browser = {
    platform: process.env.CLIENT_PLATFORM || 'Whatsapp MD',
    browser: process.env.CLIENT_BROWSER || 'Chrome',
    version: process.env.CLIENT_VERSION || '4.0.0',
  };
  static readonly webhookEnabled = !!(
    process.env.WEBHOOK_ENABLED && process.env.WEBHOOK_ENABLED === 'true'
  );
  static readonly webhookUrl = process.env.WEBHOOK_URL;
  static readonly webhookBase64 = !!(
    process.env.WEBHOOK_BASE64 && process.env.WEBHOOK_BASE64 === 'true'
  );
  static readonly protectRoutes = !!(
    process.env.PROTECT_ROUTES && process.env.PROTECT_ROUTES === 'true'
  );
  static readonly markMessagesRead = !!(
    process.env.MARK_MESSAGES_READ && process.env.MARK_MESSAGES_READ === 'true'
  );
  static readonly webhookAllowedEvents =
    process.env.WEBHOOK_ALLOWED_EVENTS?.split(',') || ['all'];
}

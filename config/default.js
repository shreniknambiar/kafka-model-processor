/**
 * The default configuration.
 */
module.exports = {
  KAFKA_CLIENT_CERT: process.env.KAFKA_CLIENT_CERT ? process.env.KAFKA_CLIENT_CERT.replace('\\n', '\n') : null,
  KAFKA_CLIENT_CERT_KEY: process.env.KAFKA_CLIENT_CERT_KEY ? process.env.KAFKA_CLIENT_CERT_KEY.replace('\\n', '\n') : null,
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PRODUCER_PORT: process.env.PORT || '3000',
  CONSUMER_PORT: process.env.PORT || '4000',
  AUTH_SECRET: process.env.JWT_TOKEN_SECRET,
  VALID_ISSUERS: process.env.VALID_ISSUERS ? process.env.VALID_ISSUERS.replace(/\\"/g, '') : null,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || '',

  LOOKUP_CREATE_TOPIC: process.env.LOOKUP_CREATE_TOPIC || 'lookup.notification.create',
  LOOKUP_UPDATE_TOPIC: process.env.LOOKUP_UPDATE_TOPIC || 'lookup.notification.update',
  LOOKUP_DELETE_TOPIC: process.env.LOOKUP_DELETE_TOPIC || 'lookup.notification.delete',

  // Configuration for generating machine to machine auth0 token.
  // The token will be used for calling another internal API.
  AUTH0_URL: process.env.AUTH0_URL || '',
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
  // The token will be cached.
  // We define the time period of the cached token.
  TOKEN_CACHE_TIME: process.env.TOKEN_CACHE_TIME || 86400000,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET
}

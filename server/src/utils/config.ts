import dotenv from 'dotenv';

dotenv.config();

const env = (name: string) => {
  return process.env[name];
};

const optionalEnv = (name: string, fallback: string) => {
  return env(name) || fallback;
};

const requiredEnv = (name: string) => {
  const value = env(name);
  if (!value) {
    throw new Error(`Required environment variable ${name} not defined`);
  }
  return value;
};

export const config = {
  port: optionalEnv('PORT', '3000'),
  production: env('NODE_ENV') === 'production',
  rateLimit: env('RATE_LIMIT') || '0',
  keycloak: {
    realm: requiredEnv('KC_REALM'),
    resource: requiredEnv('KC_RESOURCE'),
    'auth-server-url': requiredEnv('KC_SERVER'),
    'ssl-required': requiredEnv('KC_SSL_REQUIRED'),
    'bearer-only': true,
    'confidential-port': 0,
  },
};

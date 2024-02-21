import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  database_url: process.env.MONGODB_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
};

export const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: num({ default: 8080 }),
  MONGODB_URI: str(),
  BCRYPT_SALT_ROUNDS: num({ default: 10 }),
  DEFAULT_PASSWORD: str(),
  CLOUD_NAME: str(),
  API_KEY: str(),
  API_SECRET: str(),
});

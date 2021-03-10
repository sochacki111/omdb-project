import fs from 'fs';
import dotenv from 'dotenv';

import logger from '../config/logger';
import { ENVIRONMENT } from './environment';

const prod = ENVIRONMENT === 'production';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug(
    'Using .env.example file to supply config environment variables'
  );
  dotenv.config({ path: '.env.example' });
}

export const MONGODB_URI = prod
  ? String(process.env.MONGODB_URI)
  : String(process.env.MONGODB_URI_LOCAL);

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    );
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    );
  }
  process.exit(1);
}

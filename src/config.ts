import dotenv from 'dotenv';

dotenv.config();

export const { PORT, MONGODB_URI, DATABASE_NAME, KEY_PATH, CERT_PATH } = process.env;

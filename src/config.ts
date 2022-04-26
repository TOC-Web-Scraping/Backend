import dotenv from 'dotenv';

dotenv.config();

export const { PORT, MONGODB_URI, DATABASE_NAME } = process.env;

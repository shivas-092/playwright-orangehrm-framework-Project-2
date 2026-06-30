import dotenv from 'dotenv';

// Loads variables from the .env file into process.env
dotenv.config();
function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseUrl: process.env.BASE_URL!,
  username: process.env.ORANGE_USERNAME!,
  password: process.env.ORANGE_PASSWORD!,
};
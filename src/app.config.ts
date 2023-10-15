import path from 'path';
import { AppConfig } from "@server/types"
import { asNumber } from "@server";

export const config: AppConfig = {
  port: asNumber(process.env.PORT || 3000),
  publicFolder: path.join(__dirname, 'public'),
};

export default config;
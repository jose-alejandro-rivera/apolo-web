import * as dotenv from "dotenv";
import { ɵConsole } from "@angular/core";

dotenv.config();
let path;
//console.log('directorio raíz de los ambientes', __dirname, process.env.NODE_ENV + "--");
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/environments/test.env`;
    break;
  case "production":
    path = `${__dirname}/environments/prod.env`;
    break;
  default:
    path = `${__dirname}/environments/dev.env`;
}
dotenv.config({ path: path });
export default {
  environment: process.env.ENVIRONMENT || 'test',
  BASE_URL: process.env.BASE_URL,
};
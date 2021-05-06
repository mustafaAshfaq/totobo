import * as envalid from 'envalid';
import * as dotenv from 'dotenv';
import {str,url,port} from 'envalid';

dotenv.config();

let path;
switch (process.env.NODE_ENV) {
  case 'prod':
    path = `${__dirname}/../.env.production`;
    break;
  case 'test':
    path = `${__dirname}/../.env.test`;
    break;
  case 'ci':
    path = `${__dirname}/../.env.ci`;
    break;
  default:
    path = `${__dirname}/../.env.dev`;
}

const { error } = dotenv.config({ path });
if (error) throw error;

envalid.cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['dev', 'test', 'prod', 'ci'],
    default: 'dev',
  }),
  PORT: port(),
  FRONT_BASE_URL: url(),
  JWT_SECRET: str(),
  MONGO_URL: str(),
  API_URL:str(),
  API_KEY:str()
});

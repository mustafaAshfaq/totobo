import {Config} from '../../../../libs/config/src/index';
export const environment = {
  production: true,
  apiEndpoint:Config.DEFAULT_CONFIG.prodApiEndpoint,
  appName:Config.DEFAULT_CONFIG.appName,
  config:Config.DEFAULT_CONFIG
};
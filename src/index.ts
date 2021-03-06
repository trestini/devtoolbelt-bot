import {config as env} from 'dotenv';
env();

const {npm_package_name, npm_package_version} = process.env;
const appLabel = `${npm_package_name}:${npm_package_version}`;

const {ENV, NODE_ENV, CONFIG_PATH, CONFIG_RENEW} = process.env;
const isProd = (NODE_ENV === "production" || ENV === "production");

console.log(`>>>>>>>>>>>>>>>>>>>>>> Starting application ${appLabel}`);

const configPath = CONFIG_PATH || (isProd ? "/config/config.json" : "./config/config.json");
const configRenew = CONFIG_RENEW || "10_000";

console.log(`-------------------------------------------
Runtime configuration:
NODE_ENV: ${NODE_ENV}
Is production environment: ${isProd}
Configuration path: ${configPath}
Configuration rewew ${configRenew}ms
-------------------------------------------`)

import ConfigHandler from './utils/config-handler';
const config = new ConfigHandler(configPath, parseInt(configRenew));

console.log("- Global configuration module loaded");

import {loadModules} from './utils/di';

console.log("- Starting dependency injection");
const loaded = loadModules(config)
  .filter(m => (m.bootable));

console.log("- Starting bootable modules");
Promise.all(loaded.map(b => b.instance.boot()))
  .then(_ => console.log(`[√] Application ${appLabel} succesfully started`))
  .catch(e => {
    console.error(`[X] Application ${appLabel} startup failed`, e);
    process.exit(1);
  });

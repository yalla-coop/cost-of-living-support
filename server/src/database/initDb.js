/* eslint-disable no-console */
import { execSync } from 'child_process';
import Debug from 'debug';
import config from '../config';
import * as constants from '../constants';

const debug = Debug('server');

const { PRODUCTION } = constants.envTypes;

const initDBProd = async () => {
  debug('checking DB status Prod');

  debug('running migrations');
  execSync('npm run migrate:up', { stdio: 'inherit' });
  debug('initializing DB Completed');
};

const initDBDev = async () => {
  console.log('init Dev DB');

  debug('checking DB status');
  execSync('npm run migrate:up', { stdio: 'inherit' });
  debug('initializing DB Completed');
};

const initDB = async () => {
  if (config.common.env === PRODUCTION) {
    await initDBProd();
  } else {
    await initDBDev();
  }
};

export default initDB;

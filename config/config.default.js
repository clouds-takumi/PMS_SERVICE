/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580738030343_4855';

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'pms',
    username: 'root',
<<<<<<< HEAD
    password: '123456',
=======
    password: 'zxcvzxh.1013',
    timezone: '+08:00',
>>>>>>> b1f5c0b690baaa5ced348ad5b66e5c1738701c0f
  };

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  config.errorHandler = {
    match: '/api',
  };
  config.jwt = {
    secret: 'pms',
    expire: '24h',
  };
  config.cors = {
    origin: '*',
  };
  config.security = {
    csrf: false,
    domainWhiteList: [ 'http://localhost:8000' ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

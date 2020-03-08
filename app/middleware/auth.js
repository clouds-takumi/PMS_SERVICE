'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function auth(ctx, next) {
    let token = ctx.get('authorization');

    if (token === undefined) {
      ctx.body = {
        msg: '请登录',
        code: 1,
      };
      return;
    }
    token = token.replace(/^Bearer\s/, '');

    try {
      const decode = jwt.verify(token, ctx.app.config.jwt.secret, {
        expiresIn: ctx.app.config.jwt.expire,
      });
      ctx.uid = decode.uid;
      await next();
    } catch (err) {
      ctx.body = {
        msg: err.message,
        code: 1,
      };
    }
  };
};

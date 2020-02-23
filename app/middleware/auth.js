'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function auth(ctx, next) {
    let token = ctx.request.header.authorization;

    if (token === undefined) {
      ctx.body = {
        msg: '请登录',
        code: 1,
      };
      return;
    }
    token = token.replace(/^Bearer\s/, '');

    try {
      jwt.verify(token, ctx.app.config.jwt.secret, {
        expiresIn: ctx.app.config.jwt.expire,
      });
      await next();
    } catch (err) {
      console.log(err);
      ctx.body = {
        msg: '登录信息已过期，请重新登录',
        code: 1,
      };
    }
  };
};

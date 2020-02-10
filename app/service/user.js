'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');

class UserService extends Service {
  async login(username, password) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ where: { username } });
    if (!user) {
      ctx.body = {
        msg: '用户名或者密码错误!',
        code: 3,
      };
      return;
    }
    if (user) {
      if (user.password !== md5(password)) {
        ctx.body = {
          msg: '用户名或者密码错误!',
          code: 3,
        };
        return;
      }

      return user;
    }
  }

  async register(username, password) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ where: { username } });
    if (user) {
      ctx.body = {
        msg: '用户名已被注册!',
        code: 3,
      };
      return;
    }
    return await ctx.model.User.create({ username, password: md5(password) });
  }

  async userInfo() {
    const { ctx } = this;
    let token = ctx.request.header.authorization;
    token = token.replace(/^Bearer\s/, '');

    const decode = jwt.verify(token, ctx.app.config.jwt.secret, {
      expiresIn: ctx.app.config.jwt.expire,
    });

    const user = await ctx.model.User.findByPk(decode.uid);
    return {
      id: user.id,
      username: user.username,
    };
  }
}

module.exports = UserService;

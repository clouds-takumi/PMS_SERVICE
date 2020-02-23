'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');

class UserService extends Service {
  async login(username) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ where: { username } });
    return user;
  }

  async register(username, password, avatar) {
    const { ctx } = this;
    const user = await ctx.model.User.create({ username, password: md5(password), avatar });

    return user;
  }

  async userInfo(uid) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(uid);

    return user;
  }
}

module.exports = UserService;

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
    const user = await ctx.model.User.create({ username, password: md5(password), avatar, name: username });

    return user;
  }

  async userInfo(uid) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(uid);

    return user;
  }

  async getAll(params) {
    const { ctx } = this;
    const users = await ctx.model.User.findAll(params);

    return users;
  }

  async update(id, params) {
    const { ctx } = this;
    const user = await ctx.model.User.update(params, { where: { id } });

    return user;
  }
}

module.exports = UserService;

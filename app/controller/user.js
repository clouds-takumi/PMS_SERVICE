'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    const user = await ctx.service.user.login(username, password);

    if (user && user.id) {
      const token = jwt.sign({ uid: user.id }, this.app.config.jwt.secret, {
        expiresIn: this.app.config.jwt.expire,
      });
      ctx.body = {
        code: 0,
        msg: '',
        data: { token },
      };
    }
  }

  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    const user = await ctx.service.user.register(username, password);

    ctx.body = {
      code: 0,
      msg: '',
      data: {
        username: user.username,
      },
    };
  }

  async userInfo() {
    const { ctx } = this;

    const user = await ctx.service.user.userInfo();
    ctx.body = {
      code: 0,
      msg: '',
      data: user,
    };
  }
}

module.exports = LoginController;

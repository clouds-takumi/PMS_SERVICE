'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const md5 = require('js-md5');

const createRule = {
  username: {
    type: 'string',
    max: 10,
    min: 6,
    trim: true,
  },
  password: {
    type: 'string',
    max: 10,
    min: 6,
  },
};

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate(createRule);
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.login(username);

    if (!user) {
      ctx.body = {
        code: 1,
        msg: '用户不存在',
      };
      return;
    }

    const md5Password = user.password;
    if (md5Password !== md5(password)) {
      ctx.body = {
        code: 1,
        msg: '用户名或密码错误',
      };
      return;
    }

    const { secret, expire } = this.config.jwt;
    const token = jwt.sign({ uid: user.id }, secret, {
      expiresIn: expire,
    });
    ctx.body = {
      code: 0,
      data: { token },
    };
  }

  async register() {
    const { ctx } = this;
    ctx.validate(createRule);
    const { username, password } = ctx.request.body;
    const avatar = `http://www.gravatar.com/avatar/${Date.now()}?r=PG&s=256&default=identicon`;

    await ctx.service.user.register(username, password, avatar);

    ctx.body = {
      code: 0,
    };
  }

  async userInfo() {
    const { ctx } = this;
    const user = await ctx.service.user.userInfo(ctx.uid);
    const { id, username, avatar, name, desc } = user;
    // const projects = await ctx.service.project.getAll({
    //   where: {
    //     userId: id,
    //   },
    // });

    ctx.body = {
      code: 0,
      data: {
        id,
        username,
        avatar,
        name,
        desc,
        // projects: projects.rows,
      },
    };
  }

  async update() {
    const { ctx } = this;
    await ctx.service.user.update(ctx.uid, ctx.request.body);

    ctx.body = {
      code: 0,
    };
  }

  async getAll() {
    const { ctx } = this;

    const users = await ctx.service.user.getAll();

    ctx.body = {
      code: 0,
      data: users.filter(user => user.id !== ctx.uid),
    };
  }
}

module.exports = UserController;

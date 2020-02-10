'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  color: 'string',
};

class TagController extends Controller {
  async getAll() {
    const { ctx } = this;

    const tags = await ctx.service.tag.getAll();

    ctx.body = {
      code: 0,
      msg: '',
      data: tags,
    };
  }

  async getOne() {
    const { ctx } = this;

    const tag = await ctx.service.tag.getOne(ctx.params.id);

    ctx.body = {
      code: 0,
      msg: '',
      data: tag,
    };
  }

  async create() {
    const { ctx } = this;

    ctx.validate(createRule, ctx.request.body);

    const tag = await ctx.service.tag.create(ctx.request.body);

    ctx.body = {
      code: 0,
      msg: '',
      data: {
        id: tag.id,
      },
    };
  }

  async destroy() {
    const { ctx } = this;

    await ctx.service.tag.destroy(ctx.params.id);

    ctx.body = {
      code: 0,
      msg: '操作成功',
    };
  }

  async update() {
    const { ctx } = this;

    const tag = await ctx.service.tag.update(ctx.params.id, ctx.request.body);

    ctx.body = {
      code: 0,
      msg: '操作成功',
      data: {
        id: tag.id,
      },
    };
  }
}

module.exports = TagController;

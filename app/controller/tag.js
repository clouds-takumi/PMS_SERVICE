'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: {
    type: 'string',
    max: 10,
    min: 1,
  },
  color: 'string',
};

class TagController extends Controller {
  async getAll() {
    const { ctx } = this;

    const tags = await ctx.service.tag.getAll();

    ctx.body = {
      code: 0,
      data: tags,
    };
  }

  async getOne() {
    const { ctx } = this;
    const tag = await ctx.service.tag.getOne(ctx.params.id);

    ctx.body = {
      code: 0,
      data: tag,
    };
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule);

    const tag = await ctx.service.tag.create(ctx.request.body);

    ctx.body = {
      code: 0,
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
    };
  }

  async update() {
    const { ctx } = this;

    const tag = await ctx.service.tag.update(ctx.params.id, ctx.request.body);

    ctx.body = {
      code: 0,
      data: {
        id: tag.id,
      },
    };
  }
}

module.exports = TagController;

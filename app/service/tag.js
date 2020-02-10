'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async getAll() {
    const { ctx } = this;

    const tags = await ctx.model.Tag.findAll();

    return tags;
  }

  async getOne(id) {
    const { ctx } = this;

    return await ctx.model.Tag.findByPk(+id);
  }

  async create(params) {
    const { ctx } = this;

    return await ctx.model.Tag.create(params);
  }

  async destroy(id) {
    const { ctx } = this;

    try {
      ctx.model.Tag.destroy({ where: { id } });
    } catch (err) {
      ctx.body = {
        code: 9,
        msg: '删除失败',
      };
    }
  }

  async update(id, params) {
    const { ctx } = this;

    return await ctx.model.Tag.update(params, { where: { id } });
  }
}

module.exports = TagService;

'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async getAll(params) {
    const { ctx } = this;
    params.include = [{
      model: ctx.model.Project,
    }];
    const tags = await ctx.model.Tag.findAll(params);

    return tags;
  }

  async getOne(id) {
    const { ctx } = this;
    const tag = await ctx.model.Tag.findByPk(id);

    return tag;
  }

  async create(params) {
    const { ctx } = this;
    const tag = await ctx.model.Tag.create(params);

    return tag;
  }

  async destroy(id) {
    const { ctx } = this;
    const tag = await ctx.model.Tag.destroy({ where: { id } });

    return tag;
  }

  async update(id, params) {
    const { ctx } = this;
    const tag = await ctx.model.Tag.update(params, { where: { id } });

    return tag;
  }
}

module.exports = TagService;

'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async getAll(params) {
    const { ctx } = this;
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
    await this.service.activity.create(
      ctx.params.projectId,
      'CREATE',
      tag.id,
      tag.name,
      'tag'
    );

    return tag;
  }

  async destroy(id) {
    const { ctx } = this;
    const a = await ctx.model.Tag.findByPk(id);
    const tag = await ctx.model.Tag.destroy({ where: { id } });
    await this.service.activity.create(
      ctx.params.projectId,
      'DELETE',
      a.id,
      a.name,
      'tag'
    );

    return tag;
  }

  async update(id, params) {
    const { ctx } = this;
    const a = await ctx.model.Tag.findByPk(id);
    const tag = await ctx.model.Tag.update(params, { where: { id } });
    await this.service.activity.create(
      ctx.params.projectId,
      'UPDATE',
      a.id,
      a.name,
      'tag'
    );

    return tag;
  }
}

module.exports = TagService;

'use strict';

const Service = require('egg').Service;

class ProjectService extends Service {
  async getAll() {
    const { ctx } = this;
    const { query } = ctx;

    const projectsCount = await ctx.model.Project.count();

    const searchParams = {
      where: query,
    };
    const pageSize = query.pageSize || 10;
    const page = query.page || 1;

    searchParams.offset = (page - 1) * pageSize;
    searchParams.limit = pageSize;

    const projects = await ctx.model.Project.findAll(searchParams);

    return {
      lists: projects,
      page,
      pageSize,
      total: projectsCount,
    };
  }

  async getOne(id) {
    const { ctx } = this;

    return await ctx.model.Project.findByPk(+id);
  }

  async create(params) {
    const { ctx } = this;

    return await ctx.model.Project.create(params);
  }

  async destroy(id) {
    const { ctx } = this;

    try {
      ctx.model.Project.destroy({ where: { id } });
    } catch (err) {
      ctx.body = {
        code: 9,
        msg: '删除失败',
      };
    }
  }

  async update(id, params) {
    const { ctx } = this;

    return await ctx.model.Project.update(params, { where: { id } });
  }
}

module.exports = ProjectService;

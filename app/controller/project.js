'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: {
    type: 'string',
    max: 20,
    min: 1,
  },
  desc: 'string?',
  tags: 'string?',
};

class ProjectController extends Controller {
  async getAll() {
    const { ctx } = this;
    const { query } = ctx;
    const searchParams = { where: {} };
    const { Op } = this.app.Sequelize;
    if (query.name) {
      searchParams.where.name = {
        [Op.like]: `%${query.name}%`,
      };
    }
    let page = 1;
    let pageSize = 3;
    if (query.page) {
      page = +query.page;
    }
    if (query.pageSize) {
      pageSize = +query.pageSize;
    }
    searchParams.offset = (page - 1) * pageSize;
    searchParams.limit = pageSize;

    const projects = await ctx.service.project.getAll(searchParams);

    ctx.body = {
      code: 0,
      data: {
        pageSize,
        page,
        lists: projects.rows,
        total: projects.count,
      },
    };
  }

  async getOne() {
    const { ctx } = this;

    const project = await ctx.service.project.getOne(ctx.params.id);

    ctx.body = {
      code: 0,
      data: project,
    };
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule);
    const params = ctx.request.body;
    params.userId = ctx.uid;
    const project = await ctx.service.project.create(params);

    ctx.body = {
      code: 0,
      data: {
        id: project.id,
      },
    };
  }

  async destroy() {
    const { ctx } = this;

    await ctx.service.project.destroy(ctx.params.id);

    ctx.body = {
      code: 0,
    };
  }

  async update() {
    const { ctx } = this;
    ctx.validate(createRule);
    await ctx.service.project.update(ctx.params.id, ctx.request.body);

    ctx.body = {
      code: 0,
    };
  }
}

module.exports = ProjectController;

'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: {
    type: 'string',
    max: 20,
    min: 1,
  },
  assignee: 'string?',
  startDate: 'string',
  desc: 'string?',
  projectId: 'string',
};

class IterationController extends Controller {
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
    if (query.assignee) {
      searchParams.where.assignee = query.assignee;
    }
    if (query.startDate) {
      searchParams.where.startDate = query.startDate;
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

    const iterations = await ctx.service.iteration.getAll(searchParams);

    ctx.body = {
      code: 0,
      data: {
        pageSize,
        page,
        lists: iterations.rows,
        total: iterations.count,
      },
    };
  }

  async getOne() {
    const { ctx } = this;

    const iteration = await ctx.service.iteration.getOne(ctx.params.id);

    ctx.body = {
      code: 0,
      data: iteration,
    };
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule);
    const params = ctx.request.body;
    const iteration = await ctx.service.iteration.create(params);

    ctx.body = {
      code: 0,
      data: {
        id: iteration.id,
      },
    };
  }

  async destroy() {
    const { ctx } = this;

    await ctx.service.iteration.destroy(ctx.params.id);

    ctx.body = {
      code: 0,
    };
  }

  async update() {
    const { ctx } = this;
    ctx.validate(createRule);
    await ctx.service.iteration.update(ctx.params.id, ctx.request.body);

    ctx.body = {
      code: 0,
    };
  }
}

module.exports = IterationController;

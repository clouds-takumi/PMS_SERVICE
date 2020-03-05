'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: {
    type: 'string',
    max: 20,
    min: 1,
  },
  desc: 'string?',
  assignee: 'string?',
  priority: 'number',
  deadline: 'stirng?',
  iterationId: 'string?',
};

class IssueController extends Controller {
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
    if (query.deadline) {
      searchParams.where.deadline = query.deadline;
    }
    if (query.priority) {
      searchParams.where.priority = query.priority;
    }
    let page = 1;
    let pageSize = 20;
    if (query.page) {
      page = +query.page;
    }
    if (query.pageSize) {
      pageSize = +query.pageSize;
    }
    searchParams.offset = (page - 1) * pageSize;
    searchParams.limit = pageSize;

    const issues = await ctx.service.issue.getAll(searchParams);

    ctx.body = {
      code: 0,
      data: {
        pageSize,
        page,
        lists: issues.rows,
        total: issues.count,
      },
    };
  }

  async getOne() {
    const { ctx } = this;

    const issue = await ctx.service.issue.getOne(ctx.params.id);

    ctx.body = {
      code: 0,
      data: issue,
    };
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule);
    const params = ctx.request.body;
    const issue = await ctx.service.issue.create(params);

    ctx.body = {
      code: 0,
      data: {
        id: issue.id,
      },
    };
  }

  async destroy() {
    const { ctx } = this;

    await ctx.service.issue.destroy(ctx.params.id);

    ctx.body = {
      code: 0,
    };
  }

  async update() {
    const { ctx } = this;
    ctx.validate(createRule);
    await ctx.service.issue.update(ctx.params.id, ctx.request.body);

    ctx.body = {
      code: 0,
    };
  }
}

module.exports = IssueController;

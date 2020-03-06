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
  deadline: 'string?',
  iterationId: 'string?',
};
const sortRule = {
  sourceId: 'string',
  targetId: 'string?',
  targetIterationId: 'string?',
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
    if (query.iterationId) {
      searchParams.where.iterationId = query.iterationId;
    }
    if (query.iterationId === '0') {
      searchParams.where.iterationId = null;
    }
    if (query.sortType === 'sort') {
      searchParams.order = [
        [ query.sortType, 'ASC' ],
      ];
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

  async sort() {
    const { ctx, app } = this;
    ctx.validate(sortRule);
    const params = ctx.request.body;
    const { Op } = app.Sequelize;
    const { sourceId, targetId, targetIterationId = null } = params;

    if (!targetId) {
      const sort = await ctx.model.Issue.max('sort', { where: { iterationId: targetIterationId } });

      await ctx.service.issue.update(sourceId, { sort: isNaN(sort) ? 1 : sort + 1, iterationId: targetIterationId });
    } else {
      const target = await await ctx.service.issue.getOne(targetId);
      const sortParams = {
        sort: ctx.model.literal('sort + 1'),
      };
      const sortSearchParams = {
        where: {
          iterationId: targetIterationId,
          sort: {
            [Op.gte]: target.sort,
          },
        },
      };
      await ctx.model.Issue.update(sortParams, sortSearchParams);
      await ctx.service.issue.update(sourceId, { sort: target.sort, iterationId: targetIterationId });
    }

    ctx.body = {
      code: 0,
    };
  }
}

module.exports = IssueController;

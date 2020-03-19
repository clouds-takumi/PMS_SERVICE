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
  iterationId: 'number?',
};
const sortRule = {
  sourceId: 'string', // 必须，拖动的事项id
  targetId: 'string?', // 目标事项的id。如果事项是最后一个，则不传。
  targetIterationId: 'string?', // 目标迭代id。如果是拖到backlog。则不传。
};

class IssueController extends Controller {
  async getAll() {
    const { ctx } = this;
    const { query, params } = ctx;
    const searchParams = { where: { projectId: params.projectId } };
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
    params.projectId = ctx.params.projectId;
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
    const projectId = ctx.params.projectId;
    const { Op } = app.Sequelize;
    const { sourceId, targetId, targetIterationId = null } = params;

    if (!targetId) {
      const sort = await ctx.model.Issue.max('sort', { where: { iterationId: targetIterationId, projectId } });

      await ctx.service.issue.update(sourceId, { sort: isNaN(sort) ? 1 : sort + 1, iterationId: targetIterationId, projectId });
    } else {
      const target = await await ctx.service.issue.getOne(targetId);
      const sortParams = {
        sort: ctx.model.literal('sort + 1'),
      };
      const sortSearchParams = {
        where: {
          iterationId: targetIterationId,
          projectId,
          sort: {
            [Op.gte]: target.sort,
          },
        },
      };
      await ctx.model.Issue.update(sortParams, sortSearchParams);
      await ctx.service.issue.update(sourceId, { sort: target.sort, iterationId: targetIterationId, projectId });
    }

    ctx.body = {
      code: 0,
    };
  }
}

module.exports = IssueController;

'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  status: 'number',
  startDate: { type: 'string', required: false },
  endDate: { type: 'string', required: false },
  created: 'number',
  tags: { type: 'string', required: false },
};

class ProjectController extends Controller {
  async getAll() {
    const { ctx } = this;

    const projects = await ctx.service.project.getAll();

    ctx.body = {
      code: 0,
      msg: '',
      data: projects,
    };
  }

  async getOne() {
    const { ctx } = this;

    const project = await ctx.service.project.getOne(ctx.params.id);

    ctx.body = {
      code: 0,
      msg: '',
      data: project,
    };
  }

  async create() {
    const { ctx } = this;

    ctx.validate(createRule, ctx.request.body);

    const project = await ctx.service.project.create(ctx.request.body);

    ctx.body = {
      code: 0,
      msg: '',
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
      msg: '操作成功',
    };
  }

  async update() {
    const { ctx } = this;

    const project = await ctx.service.project.update(ctx.params.id, ctx.request.body);

    ctx.body = {
      code: 0,
      msg: '操作成功',
      data: {
        id: project.id,
      },
    };
  }
}

module.exports = ProjectController;

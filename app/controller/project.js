'use strict';

const Controller = require('egg').Controller;

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

  // async create() {}

  // async destroy() {}
}

module.exports = ProjectController;

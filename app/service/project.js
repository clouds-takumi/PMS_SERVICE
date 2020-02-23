'use strict';

const Service = require('egg').Service;

class ProjectService extends Service {
  async getAll(params) {
    const { ctx } = this;
    params.include = [{
      model: ctx.model.User,
    }];
    const projects = await ctx.model.Project.findAndCountAll(params);

    return projects;
  }

  async getOne(id) {
    const { ctx } = this;
    const project = await ctx.model.Project.findByPk(id, {
      include: [{
        model: ctx.model.User,
      }],
    });

    return project;
  }

  async create(params) {
    const { ctx } = this;
    const project = await ctx.model.Project.create(params);

    return project;
  }

  async destroy(id) {
    const { ctx } = this;
    const project = await ctx.model.Project.destroy({ where: { id } });

    return project;
  }

  async update(id, params) {
    const { ctx } = this;
    const project = await ctx.model.Project.update(params, { where: { id } });

    return project;
  }
}

module.exports = ProjectService;

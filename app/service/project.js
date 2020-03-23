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

  async getOne(params) {
    const { ctx } = this;
    const { Op } = this.app.Sequelize;
    const project = await ctx.model.Project.findOne({
      where: params,
      include: [{
        model: ctx.model.User,
      }],
    });
    const { participant } = project;
    let participantResult = [];
    if (participant) {
      participantResult = await ctx.model.User.findAll({
        where: {
          id: {
            [Op.in]: participant.split(',').map(p => +p),
          },
        },
      });
    }
    project.participant = participantResult.map(p => ({
      id: p.id,
      name: p.name,
    }));

    return project;
  }

  async create(params) {
    const { ctx } = this;
    const project = await ctx.model.Project.create(params);
    await this.service.activity.create(
      project.id,
      'CREATE',
      project.id,
      project.name,
      'project'
    );

    return project;
  }

  async destroy(id) {
    const { ctx } = this;
    const p = await ctx.model.Project.findByPk(id);
    const project = await ctx.model.Project.destroy({ where: { id } });
    await this.service.activity.create(
      id,
      'DELETE',
      p.id,
      p.name,
      'project'
    );

    return project;
  }

  async update(id, params) {
    const { ctx } = this;
    const project = await ctx.model.Project.update(params, { where: { id } });
    const p = await ctx.model.Project.findByPk(id);
    await this.service.activity.create(
      id,
      'UPDATE',
      p.id,
      p.name,
      'project'
    );

    return project;
  }
}

module.exports = ProjectService;

'use strict';

const Service = require('egg').Service;

class IterationService extends Service {
  async getAll(params) {
    const { ctx } = this;
    params.include = [{
      model: ctx.model.Project,
    }];
    const iterations = await ctx.model.Iteration.findAndCountAll(params);

    return iterations;
  }

  async getOne(id) {
    const { ctx } = this;
    const iteration = await ctx.model.Iteration.findByPk(id, {
      include: [{
        model: ctx.model.Project,
      }],
    });

    return iteration;
  }

  async create(params) {
    const { ctx } = this;
    const iteration = await ctx.model.Iteration.create(params);

    return iteration;
  }

  async destroy(id) {
    const { ctx } = this;
    const iteration = await ctx.model.Iteration.destroy({ where: { id } });

    return iteration;
  }

  async update(id, params) {
    const { ctx } = this;
    const iteration = await ctx.model.Iteration.update(params, { where: { id } });

    return iteration;
  }
}

module.exports = IterationService;

'use strict';

const Service = require('egg').Service;

class IssueService extends Service {
  async getAll(params) {
    const { ctx } = this;
    params.include = [{
      model: ctx.model.Iteration,
    }];
    const issues = await ctx.model.Issue.findAndCountAll(params);

    return issues;
  }

  async getOne(id) {
    const { ctx } = this;
    const issue = await ctx.model.Issue.findByPk(id, {
      include: [{
        model: ctx.model.Iteration,
      }],
    });

    return issue;
  }

  async create(params) {
    const { ctx } = this;
    const issue = await ctx.model.Issue.create(params);

    return issue;
  }

  async destroy(id) {
    const { ctx } = this;
    const issue = await ctx.model.Issue.destroy({ where: { id } });

    return issue;
  }

  async update(id, params) {
    const { ctx } = this;
    const issue = await ctx.model.Issue.update(params, { where: { id } });

    return issue;
  }
}

module.exports = IssueService;

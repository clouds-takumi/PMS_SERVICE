'use strict';

const Service = require('egg').Service;

class ActivityService extends Service {
  async getAll(params) {
    const { ctx } = this;
    const activity = await ctx.model.Activity.findAll(params);

    return activity;
  }

  async create(projectId, act, targetId, targetName, targetType) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(ctx.uid);
    const params = {
      projectId,
      act,
      fromId: user.id,
      fromName: user.name,
      targetId,
      targetName,
      targetType,
    };
    const activity = await ctx.model.Activity.create(params);

    return activity;
  }
}

module.exports = ActivityService;

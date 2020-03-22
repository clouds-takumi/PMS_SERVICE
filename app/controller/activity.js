'use strict';

const Controller = require('egg').Controller;

class ActivityController extends Controller {
  async getAll() {
    const { ctx } = this;
    const { params } = ctx;
    const searchParams = {
      where: {
        projectId: params.projectId,
      },
      order: [
        [ 'createdAt', 'DESC' ],
      ],
    };
    const activity = await ctx.service.activity.getAll(searchParams);

    ctx.body = {
      code: 0,
      data: activity,
    };
  }
}

module.exports = ActivityController;

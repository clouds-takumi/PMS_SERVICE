'use strict';

const Project = require('./project');

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Iteration = app.model.define('iterations', {
    name: STRING(20), // 名称
    desc: TEXT, // 描述
    assignee: STRING, // 负责人
    startDate: STRING, // 开始日期
    endDate: STRING, // 结束日期
  });

  Iteration.belongsTo(Project(app));
  Iteration.sync();

  return Iteration;
};

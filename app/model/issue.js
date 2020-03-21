'use strict';

const Iteration = require('./iteration');

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Issue = app.model.define('issue', {
    name: STRING(20), // 名称
    desc: TEXT, // 描述
    assignee: INTEGER, // 处理人
    priority: INTEGER, // 优先级
    deadline: STRING, // 截止日期
    sort: INTEGER, // 排序字段
    projectId: INTEGER,
  });

  Issue.belongsTo(Iteration(app));
  Issue.sync();

  return Issue;
};

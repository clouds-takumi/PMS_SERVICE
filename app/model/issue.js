'use strict';

const Iteration = require('./iteration');

module.exports = app => {
  const { STRING, INTEGER, TEXT, UUID, UUIDV4 } = app.Sequelize;

  const Issue = app.model.define('issue', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    name: STRING(20), // 名称
    desc: TEXT, // 描述
    assignee: STRING, // 处理人
    priority: INTEGER, // 优先级
    deadline: STRING, // 截止日期
  });

  Issue.belongsTo(Iteration(app));
  Issue.sync();

  return Issue;
};

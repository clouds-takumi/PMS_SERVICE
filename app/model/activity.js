'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Activity = app.model.define('activity', {
    act: STRING, // 名称
    fromId: INTEGER,
    fromName: STRING,
    targetId: INTEGER,
    targetName: STRING,
    targetType: STRING,
    projectId: INTEGER,
  });

  Activity.sync();

  return Activity;
};

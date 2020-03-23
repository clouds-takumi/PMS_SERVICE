'use strict';

const User = require('./user');

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Project = app.model.define('projects', {
    name: {
      type: STRING(20),
      unique: true,
    },
    desc: TEXT,
    avatar: STRING,
    participant: STRING,
  });

  Project.belongsTo(User(app));
  Project.sync();

  return Project;
};

'use strict';

const User = require('./user');

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;

  const Project = app.model.define('project', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    status: ENUM(0, 1, 2),
    startDate: DATE,
    endDate: DATE,
    created: {
      type: INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    tags: TEXT,
    created_at: DATE,
    updated_at: DATE,
  });

  return Project;
};

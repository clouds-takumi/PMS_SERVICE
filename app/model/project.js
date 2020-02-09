'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Project = app.model.define('project', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    status: INTEGER,
    start_date: DATE,
    created: INTEGER,
    tags: TEXT,
    created_at: DATE,
    updated_at: DATE,
  });

  return Project;
};

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Tag = app.model.define('tag', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    color: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  return Tag;
};

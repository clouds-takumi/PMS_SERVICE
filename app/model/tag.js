'use strict';

module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;

  const Tag = app.model.define('tags', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    name: STRING(10), // 名称
    color: STRING(10), // 颜色
  });

  Tag.sync();

  return Tag;
};

'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Tag = app.model.define('tags', {
    name: STRING(10), // 名称
    color: STRING(10), // 颜色
  });

  Tag.sync();

  return Tag;
};

'use strict';

module.exports = app => {
  const { STRING, UUID, TEXT, UUIDV4 } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    username: { type: STRING(10), allowNull: false, unique: true }, // 用户名
    password: TEXT, // 密码
    avatar: STRING, // 头像
  });

  User.sync();

  return User;
};

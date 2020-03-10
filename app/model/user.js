'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const User = app.model.define('users', {
    username: { type: STRING(10), allowNull: false, unique: true }, // 用户名
    password: TEXT, // 密码
    avatar: STRING, // 头像
  });

  User.sync();

  return User;
};

'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 projects 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE, TEXT } = Sequelize;
    await queryInterface.createTable('projects', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      status: INTEGER,
      startDate: DATE,
      endDate: DATE,
      created: {
        type: INTEGER,
        references: {
          model: {
            tableName: 'users',
            key: 'id',
          },
        },
      },
      tags: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('projects');
  },
};

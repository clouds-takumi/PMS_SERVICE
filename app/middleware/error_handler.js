'use strict';

// app/middleware/error_handler.js
const errorMap = {
  'jwt expired': 'token过期，请重新登录',
  'Validation Failed': '参数校验错误，请重试',
  'Validation error': '参数错误，请重试',
  'Internal Server Error': '服务器错误',
};

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);


      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      ctx.body = {
        code: error === 'jwt expired' ? 2 : 1,
        msg: errorMap[error],
      };
    }
  };
};

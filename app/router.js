'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth(app);

  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  router.get('/userInfo', auth, controller.user.userInfo);

  router.get('/projects', auth, controller.project.getAll);
  router.get('/project/:id', auth, controller.project.getOne);
  router.post('/project', auth, controller.project.create);
  router.delete('/project/:id', auth, controller.project.destroy);
  router.put('/project/:id', auth, controller.project.update);

  router.get('/tags', auth, controller.tag.getAll);
  router.get('/tag/:id', auth, controller.tag.getOne);
  router.post('/tag', auth, controller.tag.create);
  router.delete('/tag/:id', auth, controller.tag.destroy);
  router.put('/tag/:id', auth, controller.tag.update);
};

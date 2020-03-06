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
  router.get('/users', auth, controller.user.getAll);

  router.get('/projects', auth, controller.project.getAll);
  router.get('/project/:id', auth, controller.project.getOne);
  router.post('/project', auth, controller.project.create);
  router.delete('/project/:id', auth, controller.project.destroy);
  router.put('/project/:id', auth, controller.project.update);

  router.get('/iterations', auth, controller.iteration.getAll);
  router.get('/iteration/:id', auth, controller.iteration.getOne);
  router.post('/iteration', auth, controller.iteration.create);
  router.delete('/iteration/:id', auth, controller.iteration.destroy);
  router.put('/iteration/:id', auth, controller.iteration.update);

  router.get('/issues', auth, controller.issue.getAll);
  router.get('/issue/:id', auth, controller.issue.getOne);
  router.post('/issue', auth, controller.issue.create);
  router.post('/issue/sort', auth, controller.issue.sort);
  router.delete('/issue/:id', auth, controller.issue.destroy);
  router.put('/issue/:id', auth, controller.issue.update);

  router.get('/tags', auth, controller.tag.getAll);
  router.get('/tag/:id', auth, controller.tag.getOne);
  router.post('/tag', auth, controller.tag.create);
  router.delete('/tag/:id', auth, controller.tag.destroy);
  router.put('/tag/:id', auth, controller.tag.update);
};

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
  router.get('/project', auth, controller.project.getOne);
  router.post('/project', auth, controller.project.create);
  router.delete('/project/:id', auth, controller.project.destroy);
  router.put('/project/:id', auth, controller.project.update);

  router.get('/p/:projectId/iterations', auth, controller.iteration.getAll);
  router.get('/p/:projectId/iteration/:id', auth, controller.iteration.getOne);
  router.post('/p/:projectId/iteration', auth, controller.iteration.create);
  router.delete('/p/:projectId/iteration/:id', auth, controller.iteration.destroy);
  router.put('/p/:projectId/iteration/:id', auth, controller.iteration.update);

  router.get('/p/:projectId/issues', auth, controller.issue.getAll);
  router.get('/p/:projectId/issue/:id', auth, controller.issue.getOne);
  router.post('/p/:projectId/issue', auth, controller.issue.create);
  router.post('/p/:projectId/issue/sort', auth, controller.issue.sort);
  router.delete('/p/:projectId/issue/:id', auth, controller.issue.destroy);
  router.put('/p/:projectId/issue/:id', auth, controller.issue.update);

  router.get('/p/:projectId/tags', auth, controller.tag.getAll);
  router.get('/p/:projectId/tag/:id', auth, controller.tag.getOne);
  router.post('/p/:projectId/tag', auth, controller.tag.create);
  router.delete('/p/:projectId/tag/:id', auth, controller.tag.destroy);
  router.put('/p/:projectId/tag/:id', auth, controller.tag.update);

  router.get('/p/:projectId/users', auth, controller.user.getAll);
};

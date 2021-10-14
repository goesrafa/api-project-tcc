module.exports = function (app) {
  app.post("/auth/login", (req, res) => {
    app.app.controllers.user.signin(app, req, res);
  });

  app.post("/user", (req, res) => {
    app.app.controllers.user.createUser(app, req, res);
  });
};

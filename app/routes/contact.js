module.exports = function (app) {
  const verifyJWT = app.libs.auth.verifyJWT;

  app.post("/contact/create", verifyJWT, function (req, res) {
    app.app.controllers.contact.create(app, req, res);
  });

  app.delete("/contact/:contact_id", verifyJWT, (req, res) => {
    app.app.controllers.contact.delete(app, req, res);
  });

  app.get("/contact", verifyJWT, (req, res) => {
    app.app.controllers.contact.contacts(app, req, res);
  });
};

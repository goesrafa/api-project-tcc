module.exports = function (app) {
    const verifyJWT = app.libs.auth.verifyJWT;
  
    app.post("/hospital/create", verifyJWT, function (req, res) {
      app.app.controllers.hospital.create(app, req, res);
    });
  
    app.delete("/hospital/:hospital_id", verifyJWT, (req, res) => {
      app.app.controllers.hospital.delete(app, req, res);
    });
  
    app.get("/hospital", verifyJWT, (req, res) => {
      app.app.controllers.hospital.hospital(app, req, res);
    });
  };
  
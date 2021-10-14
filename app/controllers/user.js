const bcryptjs = require("bcryptjs");
const SECRET = "THL323&¨!@*&#(&()()&#¨&$(";
const jwtExpiresIn = "1h";

module.exports.signin = function (app, req, res) {
  const User = app.libs.db.models.User;

  const jwt = app.libs.auth.jwt;

  req.assert("name", "Nome é obrigatório").notEmpty();
  req.assert("password", "Senha é obrigatório").notEmpty();

  var erros = req.validationErrors();
  var errors = [];

  if (erros) {
    for (var i = 0; i < erros.length; i++) {
      errors.push({ param: erros[i].param, msg: erros[i].msg });
    }

    res.status(200).send({
      status_code: 203,
      message: "Dados não foram preenchidos",
      is_error: true,
      data: [],
      params_validation: errors,
    });
    return;
  }

  let sequelizeQuery = User.sequelize;
  let userName = req.body.name;
  let userPassword = req.body.password;

  sequelizeQuery
    .query("SELECT user_id, password FROM user WHERE name = :name ", {
      replacements: {
        name: userName,
      },
      type: sequelizeQuery.QueryTypes.SELECT,
    })
    .then((success) => {
      let pass = success[0]["password"];
      let userId = success[0]["user_id"];

      bcryptjs
        .compare(userPassword, pass)
        .then((result) => {
          if (result) {
            const token = jwt.sign({ user_id: userId }, SECRET, {
              expiresIn: jwtExpiresIn,
            });

            res.status(200).send({
              status_code: 201,
              message: "Login realizado com sucesso",
              is_error: false,
              data: [{ token: token, user_id: userId }],
              params_validation: errors,
            });
          } else {
            res.status(200).send({
              status_code: 202,
              message: "Nome ou senha inválida",
              is_error: true,
              data: [],
              params_validation: errors,
            });
          }
        })
        .catch((e) => {
          res.status(200).send({
            status_code: 202,
            message: "Nome ou senha inválida",
            is_error: true,
            data: [],
            params_validation: errors,
          });
        });
    })
    .catch((e) => {
      res.status(200).send({
        status_code: 500,
        message: "Falha ao tentar fazer login",
        is_error: true,
        data: [],
        params_validation: errors,
      });
    });
};

module.exports.createUser = function (app, req, res) {
  const User = app.libs.db.models.User;
  const jwt = app.libs.auth.jwt;

  req.assert("name", "Nome é obrigatório").notEmpty();
  req.assert("phone_number", "Telefone é obrigatório").notEmpty();
  req.assert("password", "Senha é obrigatório").notEmpty();

  var erros = req.validationErrors();
  var errors = [];

  if (erros) {
    for (var i = 0; i < erros.length; i++) {
      errors.push({ param: erros[i].param, msg: erros[i].msg });
    }

    res.status(200).send({
      status_code: 203,
      message: "Dados não foram preenchidos",
      is_error: true,
      data: [],
      params_validation: errors,
    });
    return;
  }

  User.create(req.body)
    .then((result) => {
      const token = jwt.sign({ user_id: result.user_id }, SECRET, {
        expiresIn: jwtExpiresIn,
      });

      res.status(200).json({
        status_code: 201,
        message: "Usuário salvo com sucesso!",
        is_error: false,
        data: [{ token: token, user_id: result.user_id }],
        params_validation: errors,
      });
    })
    .catch((e) => {
      let error = [];
      let statusCode = 500;
      let msgError = "Falha ao tentar salvar";
      if (error != undefined) {
        error = e.errors;
      }
      if (error != undefined && error.length > 0) {
        msgError = error[0].message;
      }
      res.status(200).json({
        status_code: statusCode,
        message: msgError,
        is_error: true,
        data: [],
        params_validation: errors,
      });
    });
};

module.exports.deleteUser = function (app, req, res) {
  const User = app.libs.db.models.User;

  User.destroy({ where: { user_id: req.params.user_id } })
    .then((result) => {
      if (result != undefined && result == 0) {
        res.status(200).json({
          status_code: 202,
          message: "Usuário não encontrado",
          is_error: false,
          data: [],
          params_validation: errors,
        });
        return;
      }

      res.status(200).json({
        status_code: 201,
        message: "Usuario deletado com sucesso!",
        is_error: false,
        data: [],
        params_validation: errors,
      });
    })
    .catch((error) => {
      res.status(200).json({
        status_code: 500,
        message: "Falha ao tentar deletar",
        is_error: true,
        data: [],
        params_validation: errors,
      });
    });
};

module.exports.create = function (app, req, res) {
  const Contact = app.libs.db.models.Contact;

  req.assert("name", "Nome é obrigatório").notEmpty();
  req.assert("email", "Email é obrigatório").notEmpty();
  req.assert("address", "Endereço é obrigatório").notEmpty();
  req.assert("phone", "Telefone é obrigatório").notEmpty();

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

  const data = req.body;
  data.user_id = req.user_id;

  Contact.create(req.body)
    .then((result) => {
      res.status(200).send({
        status_code: 201,
        message: "Contato salvo com sucesso!",
        is_error: false,
        data: [{ contact_id: result.contact_id }],
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
        statusCode = 202;
        msgError = error[0].message;
      }

      res.status(200).send({
        status_code: statusCode,
        message: msgError,
        is_error: true,
        data: [],
        params_validation: errors,
      });
    });
};

module.exports.contacts = function (app, req, res) {
  const Contact = app.libs.db.models.Contact;

  let sequelizeQuery = Contact.sequelize;
  sequelizeQuery
    .query("SELECT * FROM contact WHERE user_id = :query ", {
      replacements: { query: req.user_id },
      type: sequelizeQuery.QueryTypes.SELECT,
    })
    .then((result) => {
      const qtdeQuery = Array();
      qtdeQuery[0] = result;
      if (qtdeQuery[0].length > 0) {
        res.status(200).send({
          status_code: 201,
          message: "Contatos obtido com sucesso!",
          is_error: false,
          data: result,
        });
      } else {
        res.status(200).send({
          status_code: 204,
          message: "Nenhum contato cadastrado!",
          is_error: false,
          data: [],
        });
      }
    })
    .catch((e) => {
      res.status(200).send({
        status_code: 500,
        message: "Falha ao tentar buscar",
        is_error: true,
        data: [],
      });
    });
};

module.exports.delete = function (app, req, res) {
  const Contact = app.libs.db.models.Contact;
};

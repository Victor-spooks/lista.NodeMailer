var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/", function (req, res) {
  res.render("pages/index", {
    resultado: null,
    listaErros: null,
    campos: {
      nome: "",
      email: "",
      telefone: "",
      AssuntoDamenssagem:"",
      Menssagem:""
    }
  });
});

router.post(
  "/index",
  [
    body("nome")
      .isLength({ min: 10, max: 50 }).withMessage("O nome deve ter de 10 a 50 caracteres!")
      .matches(/^[A-Za-záàâãäåæçéèêíìîïóòôõöøúùûüýÿÁÀÂÃÄÅÆÇÉÈÊÍÌÎÏÓÒÔÕÖØÚÙÛÜÝŸ\s]+$/)
      .withMessage("Não será validado valores numericos no nome!"),
    body("email")
      .isEmail().withMessage("O e-mail deve ser válido!"),
    body("telefone")
      .isLength({ min: 11, max: 11 }).withMessage("O telefone deve ter 11 digitos !!"),
      body("assunto")
      .isLength({ min: 5, max: 30 }).withMessage("O assnto deve conter no minimo 5 digitos e no maximo 30!"),
      body("menssagem")
      .isLength({ min: 5, max: 500 }).withMessage("O assnto deve conter no minimo 5 digitos e no maximo 500!"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/index", {
        resultado: null,
        listaErros: errors,
        campos: req.body
      });
    }

    return res.render("pages/index", {
      resultado: req.body,
      listaErros: null,
      campos: req.body
    });
  }
);

module.exports = router;
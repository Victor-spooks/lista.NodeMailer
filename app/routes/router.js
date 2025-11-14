var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cvictor7n@gmail.com",
    pass: "crcy ugoy qxdk toxe"
  }

})

router.get("/", function (req, res) {
  res.render("pages/index", {
    resultado: null,
    listaErros: null,
    campos: {
      nome: "",
      email: "",
      telefone: "",
      AssuntoDamenssagem: "",
      Menssagem: ""
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
      .isLength({ min: 5, max: 30 }).withMessage("O assunto deve conter no minimo 5 digitos e no maximo 30!"),
    body("menssagem")
      .isLength({ min: 5, max: 500 }).withMessage("A messagem deve conter no minimo 5 digitos e no maximo 500!"),
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

    const mailOptions = {
      from: "cvictor7n@gmail.com",
      to: "cvictor7n@gmail.com",
      subject: "assunto",
      text: "menssagem em formatos texto",
      html: "<h1>menssagem em formato HTML</h1>"
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        comsole.log(error)
      } else {
        console.log(info)
        console.log("email enviado")
      }
    });
    return res.render("pages/index", {
      resultado: req.body,
      listaErros: null,
      campos: req.body
    });
  }
);

module.exports = router;
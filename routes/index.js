"use strict";

// Importa os módulos necessários
var activity = require("./activity");
var express = require("express");
var router = express.Router();

// Rota principal (/)
router.get("/", function (req, res) {
  console.log("index request!");

  if (!req.session || !req.session.token) {
    // Renderiza página de não autenticado se não houver token
    res.render("index", {
      title: "Unauthenticated",
      errorMessage:
        "This app may only be loaded via Salesforce Marketing Cloud",
    });
  } else {
    // Renderiza página com os logs se o token existir
    res.render("index", {
      title: "Journey Builder Activity",
      results: activity.logExecuteData,
    });
  }
});

// Rota para login (POST)
router.post("/login", function (req, res) {
  console.log("req.body: ", req.body);
  res.redirect("/");
});

router.get("journeybuilder/ui/index.html", (req, res) => {
  const JWT = require(Path.join(__dirname, "..", "public", "index.html")); // Para decodificar tokens JWT
  return res.render(JWT);
});

// Rotas da custom activity do Journey Builder
router.get("/journeybuilder/get", (req, res) => {
  res.json({ data: "API ONLINE" });
}); // Salva a configuração

router.post("/journeybuilder/save", activity.save); // Salva a configuração
router.post("/journeybuilder/execute", activity.execute); // Executa a atividade
router.post("/journeybuilder/publish", activity.publish); // Publica a atividade
router.post("/journeybuilder/validate", activity.validate); // Valida a atividade

// Exporta o roteador
module.exports = router;

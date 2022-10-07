const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const nome = "Rafael";
  const lang = "JavaScript";

  res.render("index", {
    nome: nome,
    lang: lang,
    empresa: "Udemy",
    inscritos: 8000
  });
});

app.listen(3333, () => {
  console.log("Servidor rodando.");
});

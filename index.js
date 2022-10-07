const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvar-pergunta", (req, res) => {
  const { titulo, descricao } = req.body;

  res.json({ titulo, descricao });
});

app.listen(3333, () => {
  console.log("Servidor rodando.");
});

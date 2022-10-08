const express = require("express");
const connection = require("./database/database");

const app = express();

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados");
  })
  .catch((error) => {
    console.log(`Ocorreu algum erro: ${error}`);
  });

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

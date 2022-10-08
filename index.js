const express = require("express");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", { perguntas: perguntas });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvar-pergunta", (req, res) => {
  const { titulo, descricao } = req.body;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  const { id } = req.params;

  Pergunta.findOne({
    where: { id: id }
  })
    .then((pergunta) => {
      if (pergunta != undefined) {
        Resposta.findAll({
          where: { perguntaId: pergunta.id },
          order: [["id", "DESC"]]
        }).then((respostas) => {
          res.render("pergunta", { pergunta, respostas });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((erro) => console.log(`Ocorreu um erro: ${erro}`));
});

app.post("/responder", (req, res) => {
  const { corpo, pergunta } = req.body;
  const perguntaId = Number(pergunta);

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  })
    .then(() => {
      res.redirect(`/pergunta/${perguntaId}`);
    })
    .catch(() => console.log("Erro!"));
});

app.listen(3333, () => {
  console.log("Servidor rodando.");
});

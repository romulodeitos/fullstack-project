const express = require("express");
const app = express();
app.use(express.json());

const produtos = [
  {
    id: 1,
    nome: "pão",
    preço: "0,50 /und",
  },
  {
    id: 2,
    nome: "leite",
    preço: "5,00 /und",
  },
  {
    id: 3,
    nome: "ovo",
    preço: "10,00 /dúzia",
  },
];

app.get("/produtos", (req, res) => {
  res.send(produtos);
});

app.post("/produtos/", (req, res) => {
  const { nome, preço } = req.body;

  if (!nome || !preço) {
    return res
      .status(400)
      .json({ error: "Nome e preço são campos obrigatórios!" });
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preço,
  };

  produtos.push(novoProduto);

  return res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preço } = req.body;
});

app.listen(3030, () => {
  console.log("Servidor está rodando na porta 3030");
});

const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const allProdutos = await prisma.produtos.findMany();
  res.json(allProdutos);
});

app.post("/", async (req, res) => {
  const newProduto = await prisma.produtos.create({ data: req.body });
  res.json(newProduto);
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  const productId = parseInt(id);

  const updateProduto = await prisma.produtos.update({
    where: {
      id: productId,
    },
    data: {
      nome: nome,
      preco: preco,
    },
  });

  res.json(updateProduto);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProduto = await prisma.produtos.delete({
    where: { id: parseInt(id) },
  });

  res.json(deleteProduto);
});

app.listen(3030, () => {
  console.log("Servidor está rodando na porta 3030");
});

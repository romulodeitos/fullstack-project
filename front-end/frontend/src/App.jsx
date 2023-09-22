import { useState, useEffect } from "react";

import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3030",
});

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [produtoDeleteId, setProdutoDeleteId] = useState("");

  useEffect(() => {
    api.get("/").then((response) => {
      console.log(response.data);
      setProdutos(response.data);
    });
  }, []);

  function newProduto() {
    api
      .post("/", {
        nome,
        preco,
      })
      .then((response) => {
        console.log(response);
      });
  }

  function updateProduto() {
    api
      .put(`/${produtoId}`, {
        nome,
        preco,
      })
      .then((response) => {
        setNome("");
        setPreco("");
        setProdutoId("");
      });
  }

  function deleteProduto() {
    api
      .delete(`/${produtoDeleteId}`, {
        produtoDeleteId,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.nome}>
            Nome: {produto.nome} - Preço: {produto.preco}
          </li>
        ))}
      </ul>

      <h2>Adicionar novo Produto</h2>
      <input
        placeholder="Nome"
        onChange={(event) => setNome(event.target.value)}
      />
      <input
        placeholder="Preço"
        onChange={(event) => setPreco(event.target.value)}
      />
      <button onClick={newProduto}>Adicionar Produto</button>

      <h2>Atualizar Produto</h2>
      <input
        placeholder="ID do Produto"
        value={produtoId}
        onChange={(event) => setProdutoId(event.target.value)}
      />
      <input
        placeholder="Novo Nome"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />
      <input
        placeholder="Novo Preço"
        value={preco}
        onChange={(event) => setPreco(event.target.value)}
      />
      <button onClick={updateProduto}>Atualizar Produto</button>

      <h2>Deletar Produto</h2>
      <input
        placeholder="ID do Produto"
        value={produtoDeleteId}
        onChange={(event) => setProdutoDeleteId(event.target.value)}
      />
      <button onClick={deleteProduto}>Deletar Produto</button>
    </div>
  );
}

export default App;

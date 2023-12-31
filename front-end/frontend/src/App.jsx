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
  const [unidade, setUnidade] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

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
        preco: parseFloat(preco),
        unidade,
      })
      .then((response) => {
        const novoProduto = response.data;
        setProdutos([...produtos, novoProduto]);
        console.log(response);
      });
  }

  function handleDeleteProduto(produtoId) {
    api.delete(`/${produtoId}`).then((response) => {
      console.log(response);

      const updatedProdutos = produtos.filter(
        (produto) => produto.id !== produtoId
      );
      setProdutos(updatedProdutos);
    });
  }

  function handleEditProduto(produto) {
    setProdutoParaEditar(produto);
    setIsModalOpen(true);
  }

  function EditModal({ produto, onClose, onSave }) {
    const [novoNome, setNovoNome] = useState(produto.nome);
    const [novoPreco, setNovoPreco] = useState(produto.preco);
    const [novaUnidade, setNovaUnidade] = useState(produto.unidade);

    const handleSave = () => {
      onSave(produto.id, novoNome, novoPreco, novaUnidade);
      onClose();
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Editar Produto</h2>
          <input
            placeholder="Novo Nome"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
          <input
            placeholder="Novo Preço"
            value={novoPreco}
            onChange={(e) => setNovoPreco(e.target.value)}
          />
          <input
            placeholder="Nova Unidade"
            value={novaUnidade}
            onChange={(e) => setNovaUnidade(e.target.value)}
          />
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    );
  }

  function handleUpdateProduto(id, novoNome, novoPreco, novaUnidade) {
    api
      .put(`/${id}`, {
        nome: novoNome,
        preco: parseFloat(novoPreco),
        unidade: novaUnidade,
      })
      .then((response) => {
        console.log(response);

        const updatedProdutos = produtos.map((produto) =>
          produto.id === id
            ? {
                ...produto,
                nome: novoNome,
                preco: parseFloat(novoPreco),
                unidade: novaUnidade,
              }
            : produto
        );
        setProdutos(updatedProdutos);

        setIsModalOpen(false);
      });
  }

  return (
    <div>
      <div className="formContainer">
        <div className="inputArea">
          <h1>Cadastrar Produto</h1>
          <input
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
          />
          <input
            placeholder="Preço"
            onChange={(event) => setPreco(event.target.value)}
          />
          <input
            placeholder="Unidade"
            onChange={(event) => setUnidade(event.target.value)}
          />
          <button onClick={newProduto}>Adicionar Produto</button>
        </div>
      </div>
      <div className="listaProdutos">
        <div className="produtos">
          <h1>Produtos</h1>
          <ul>
            {produtos.map((produto) => (
              <li className="item-lista" key={produto.nome}>
                Nome: {produto.nome} -- Preço: {produto.preco} -{" "}
                {produto.unidade}
                <div className="botao-container">
                  <button onClick={() => handleEditProduto(produto)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteProduto(produto.id)}>
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <EditModal
          produto={produtoParaEditar}
          onClose={() => setIsModalOpen(false)}
          onSave={(id, novoNome, novoPreco, novaUnidade) =>
            handleUpdateProduto(id, novoNome, novoPreco, novaUnidade)
          }
        />
      )}
    </div>
  );
}

export default App;

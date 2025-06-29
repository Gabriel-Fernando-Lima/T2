import { Component } from "react";

type Produto = { nome: string; valor: number };

type Props = {
  tema: string;
  produtos: Produto[];
  editarProduto?: (index: number) => void;
  excluirProduto?: (index: number) => void;
};

export default class ListaProduto extends Component<Props> {
  render() {
    const { produtos, tema, editarProduto, excluirProduto } = this.props;

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Lista de Produtos</h4>

        <div className="list-group">
          {produtos.map((p, i) => (
            <div
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: i % 2 ? tema : undefined }}
            >
              <span>
                <strong>{p.nome}</strong> — R$ {p.valor.toFixed(2)}
              </span>

              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => editarProduto?.(i)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => excluirProduto?.(i)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {produtos.length === 0 && (
            <div className="list-group-item">Nenhum produto cadastrado.</div>
          )}
        </div>
      </div>
    );
  }
}

import { Component } from "react";

type Cliente = { nome: string; nomeSocial: string; cpf: string };

type Props = {
  tema: string;
  clientes: Cliente[];
  editarCliente?: (index: number) => void;
  excluirCliente?: (index: number) => void;  
};

export default class ListaCliente extends Component<Props> {
  render() {
    const { tema, clientes, editarCliente, excluirCliente } = this.props;

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Lista de Clientes</h4>

        <div className="list-group">
          {clientes.map((c, i) => (
            <div
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: i % 2 ? tema : undefined }}
            >
              <span>
                <strong>{c.nome}</strong> ({c.nomeSocial}) – CPF: {c.cpf}
              </span>

              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => editarCliente?.(i)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => excluirCliente?.(i)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {clientes.length === 0 && (
            <div className="list-group-item">
              Nenhum cliente cadastrado ainda.
            </div>
          )}
        </div>
      </div>
    );
  }
}
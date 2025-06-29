import { Component } from "react";

type Servico = { nome: string; valor: number };

type Props = {
  tema: string;
  servicos: Servico[];
  editarServico?: (index: number) => void;
  excluirServico?: (index: number) => void; 
};

export default class ListaServico extends Component<Props> {
  render() {
    const { servicos, tema, editarServico, excluirServico } = this.props;

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Lista de Serviços</h4>

        <div className="list-group">
          {servicos.map((s, i) => (
            <div
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: i % 2 ? tema : undefined }}
            >
              <span>
                <strong>{s.nome}</strong> — R$ {s.valor.toFixed(2)}
              </span>

              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => editarServico?.(i)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => excluirServico?.(i)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {servicos.length === 0 && (
            <div className="list-group-item">Nenhum serviço cadastrado.</div>
          )}
        </div>
      </div>
    );
  }
}

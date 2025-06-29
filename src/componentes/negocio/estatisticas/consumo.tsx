import { Component } from "react";

type Item = { tipo: "produto" | "servico"; nome: string; qtd: number };

type Consumo = { clienteIndex: number; itens: Item[] };

type Props = {
  tema: string;
  clientes: Array<{ nome: string }>;
  consumos: Consumo[];
};

export default class ListaConsumo extends Component<Props> {
  render() {
    const { tema, clientes, consumos } = this.props;

    if (consumos.length === 0)
      return <p className="ps-3">Nenhum consumo registrado.</p>;

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Consumos Registrados</h4>

        {consumos.map((c, i) => (
          <div key={i} className="mb-3">
            <h5 className="p-2 rounded" style={{ background: tema }}>
              {clientes[c.clienteIndex]?.nome ?? "Cliente removido"}
            </h5>
            <ul className="list-group">
              {c.itens.map((it, j) => (
                <li key={j} className="list-group-item">
                  {it.tipo} — {it.nome} × {it.qtd}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

import { Component } from "react";

type Item = { tipo: "produto" | "servico"; nome: string; qtd: number };
type Consumo = { clienteIndex: number; itens: Item[] };
type Cliente = { nome: string; nomeSocial: string; cpf: string };

type Props = {
  tema: string;
  clientes: Cliente[];
  consumos: Consumo[];
};

export default class Top10Consumo extends Component<Props> {
  render() {
    const { tema, clientes, consumos } = this.props;


    const totais: { [index: number]: number } = {};
    consumos.forEach(c => {
      if (!totais[c.clienteIndex]) totais[c.clienteIndex] = 0;
      totais[c.clienteIndex] += c.itens.reduce((s, i) => s + i.qtd, 0);
    });


    const top10 = Object.entries(totais)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Top 10 Clientes que Mais Consumiram</h4>
        {top10.length === 0 ? (
          <p>Nenhum consumo registrado.</p>
        ) : (
          <ol className="list-group list-group-numbered">
            {top10.map(([idx, total], i) => {
              const cliente = clientes[Number(idx)];
              return (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: i % 2 === 0 ? undefined : tema }}
                >
                  <span>
                    <strong>{cliente?.nome || "Cliente removido"}</strong> ({cliente?.cpf})
                  </span>
                  <span className="badge bg-primary rounded-pill">
                    {total} {total === 1 ? "item" : "itens"}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    );
  }
}

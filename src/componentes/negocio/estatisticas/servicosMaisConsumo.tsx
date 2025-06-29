import { Component } from "react";

type Item = { tipo: "produto" | "servico"; nome: string; qtd: number };
type Consumo = { clienteIndex: number; itens: Item[] };

type Props = {
  tema: string;
  consumos: Consumo[];
};

export default class ServicosMaisConsumo extends Component<Props> {
  render() {
    const { tema, consumos } = this.props;

    const totalPorServico: { [nome: string]: number } = {};
    consumos.forEach(c =>
      c.itens
        .filter(it => it.tipo === "servico")
        .forEach(it => {
          totalPorServico[it.nome] =
            (totalPorServico[it.nome] || 0) + it.qtd;
        })
    );

    const ranking = Object.entries(totalPorServico).sort((a, b) => b[1] - a[1]);

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Serviços Mais Consumidos</h4>

        {ranking.length === 0 ? (
          <p>Nenhum consumo de serviços registrado.</p>
        ) : (
          <ol className="list-group list-group-numbered">
            {ranking.map(([nome, qtd], i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: i % 2 ? tema : undefined }}
              >
                {nome}
                <span className="badge bg-primary rounded-pill">
                  {qtd} {qtd === 1 ? "unidade" : "unidades"}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

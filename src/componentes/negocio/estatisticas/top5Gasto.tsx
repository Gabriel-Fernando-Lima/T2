import { Component } from "react";

type Item = { tipo: "produto" | "servico"; nome: string; qtd: number };
type Consumo = { clienteIndex: number; itens: Item[] };
type Cliente = { nome: string; nomeSocial: string; cpf: string };
type ProdutoOuServico = { nome: string; valor: number };

type Props = {
  tema: string;
  clientes: Cliente[];
  produtos: ProdutoOuServico[];
  servicos: ProdutoOuServico[];
  consumos: Consumo[];
};

export default class Top5Gasto extends Component<Props> {
  private getPreco = (tipo: "produto" | "servico", nome: string): number => {
    const tabela =
      tipo === "produto" ? this.props.produtos : this.props.servicos;
    const item = tabela.find(p => p.nome === nome);
    return item ? item.valor : 0;
  };

  render() {
    const { tema, clientes, consumos } = this.props;


    const gastos: { [idx: number]: number } = {};
    consumos.forEach(c => {
      const totalRegistro = c.itens.reduce(
        (s, it) => s + this.getPreco(it.tipo, it.nome) * it.qtd,
        0
      );
      gastos[c.clienteIndex] = (gastos[c.clienteIndex] || 0) + totalRegistro;
    });

    const top5 = Object.entries(gastos)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Top 5 Clientes por Valor Gasto</h4>

        {top5.length === 0 ? (
          <p>Nenhum consumo registrado.</p>
        ) : (
          <ol className="list-group list-group-numbered">
            {top5.map(([idx, valor], i) => {
              const cli = clientes[Number(idx)];
              return (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: i % 2 ? tema : undefined }}
                >
                  <span>
                    <strong>{cli?.nome || "Cliente removido"}</strong> ({cli?.cpf})
                  </span>
                  <span className="badge bg-success rounded-pill">
                    R$ {valor.toFixed(2)}
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

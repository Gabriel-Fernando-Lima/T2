
import { Component } from "react";

type Item = { tipo: "produto" | "servico"; nome: string; qtd: number };
type Consumo = { clienteIndex: number; itens: Item[] };
type Cliente = { nome: string; nomeSocial: string; cpf: string };
type Pet = { nome: string; tipo: string; raca: string; genero: string; dono: string };

type Props = {
  tema: string;
  clientes: Cliente[];
  pets: Pet[];
  consumos: Consumo[];
};

type Contagem = { [nome: string]: number };           
type Grupo = { produtos: Contagem; servicos: Contagem }; 

export default class ConsumoTipoRaca extends Component<Props> {
  private buildStats() {
    const { clientes, pets, consumos } = this.props;

    const petsPorDono: { [nome: string]: Pet[] } = {};
    pets.forEach(p => {
      if (!petsPorDono[p.dono]) petsPorDono[p.dono] = [];
      petsPorDono[p.dono].push(p);
    });

    const grupos: { [grupo: string]: Grupo } = {};

    const addCount = (
      grupo: string,
      cat: "produtos" | "servicos",
      nomeItem: string,
      qtd: number
    ) => {
      if (!grupos[grupo]) grupos[grupo] = { produtos: {}, servicos: {} };
      grupos[grupo][cat][nomeItem] =
        (grupos[grupo][cat][nomeItem] || 0) + qtd;
    };

 
    consumos.forEach(reg => {
      const dono = clientes[reg.clienteIndex]?.nome;
      if (!dono) return;
      const petsDoCliente = petsPorDono[dono] || [];

      reg.itens.forEach(it => {
        const cat = it.tipo === "produto" ? "produtos" : "servicos";
        petsDoCliente.forEach(pet => {
          const grupoChave = `${pet.tipo} • ${pet.raca}`;
          addCount(grupoChave, cat, it.nome, it.qtd);
        });
      });
    });

    return grupos;
  }

  render() {
    const { tema } = this.props;
    const grupos = this.buildStats();
    const chavesGrupo = Object.keys(grupos);

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Consumo por Tipo e Raça de Pet</h4>

        {chavesGrupo.length === 0 && (
          <p>Nenhum consumo vinculado a pets registrado.</p>
        )}

        {chavesGrupo.map((chave, g) => {
          const grp = grupos[chave];


          const ordenar = (c: Contagem) =>
            Object.entries(c).sort((a, b) => b[1] - a[1]);

          const listaProdutos = ordenar(grp.produtos);
          const listaServicos = ordenar(grp.servicos);

          return (
            <div key={g} className="mb-4">
              <h5 className="p-2 rounded" style={{ background: tema }}>
                {chave}
              </h5>

              {listaProdutos.length > 0 && (
                <>
                  <strong>Produtos:</strong>
                  <ol className="list-group list-group-numbered mb-2">
                    {listaProdutos.map(([nome, qtd], i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: i % 2 ? tema : undefined
                        }}
                      >
                        {nome}
                        <span className="badge bg-primary rounded-pill">
                          {qtd}
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {listaServicos.length > 0 && (
                <>
                  <strong>Serviços:</strong>
                  <ol className="list-group list-group-numbered">
                    {listaServicos.map(([nome, qtd], i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: i % 2 ? tema : undefined
                        }}
                      >
                        {nome}
                        <span className="badge bg-success rounded-pill">
                          {qtd}
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {listaProdutos.length === 0 && listaServicos.length === 0 && (
                <p className="ps-2">Nenhum item consumido.</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

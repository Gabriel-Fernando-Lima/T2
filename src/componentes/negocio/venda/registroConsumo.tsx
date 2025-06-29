import { Component } from "react";

type Item = { tipo: "produto" | "servico"; nome: string; qtd: number };

type Props = {
  tema: string;
  clientes: Array<{ nome: string }>;
  produtos: Array<{ nome: string }>;
  servicos: Array<{ nome: string }>;
  registrarConsumo: (consumo: { clienteIndex: number; itens: Item[] }) => void;
};

type State = {
  clienteIndex: string; 
  itemTipo: "produto" | "servico";
  itemNome: string;
  itemQtd: string;
  itens: Item[];
};

export default class FormularioRegistroConsumo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clienteIndex: "",
      itemTipo: "produto",
      itemNome: "",
      itemQtd: "1",
      itens: []
    };
  }

  adicionarItem = () => {
    const { itemTipo, itemNome, itemQtd } = this.state;
    if (!itemNome || Number(itemQtd) <= 0) return;
    this.setState(prev => ({
      itens: [
        ...prev.itens,
        { tipo: itemTipo, nome: itemNome, qtd: Number(itemQtd) }
      ],
      itemNome: "",
      itemQtd: "1"
    }));
  };

  registrar = () => {
    const { clienteIndex, itens } = this.state;
    if (clienteIndex === "" || itens.length === 0) {
      alert("Selecione cliente e pelo menos um item.");
      return;
    }
    this.props.registrarConsumo({ clienteIndex: Number(clienteIndex), itens });
    alert("Consumo registrado!");
    this.setState({
      clienteIndex: "",
      itemTipo: "produto",
      itemNome: "",
      itemQtd: "1",
      itens: []
    });
  };

  render() {
    const { tema, clientes, produtos, servicos } = this.props;
    const { clienteIndex, itemTipo, itemNome, itemQtd, itens } = this.state;

    const catalogo =
      itemTipo === "produto" ? produtos.map(p => p.nome) : servicos.map(s => s.nome);

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Registro de Consumo</h4>


        <div className="input-group mb-3">
          <label className="input-group-text" style={{ background: tema }}>
            Cliente
          </label>
          <select
            className="form-select"
            value={clienteIndex}
            onChange={e => this.setState({ clienteIndex: e.target.value })}
          >
            <option value="">Selecione...</option>
            {clientes.map((c, i) => (
              <option key={i} value={i}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>


        <div className="row g-2 mb-2">
          <div className="col-md-3">
            <select
              className="form-select"
              value={itemTipo}
              onChange={e =>
                this.setState({ itemTipo: e.target.value as "produto" | "servico", itemNome: "" })
              }
            >
              <option value="produto">Produto</option>
              <option value="servico">Serviço</option>
            </select>
          </div>
          <div className="col-md-5">
            <select
              className="form-select"
              value={itemNome}
              onChange={e => this.setState({ itemNome: e.target.value })}
            >
              <option value="">Selecione...</option>
              {catalogo.map(nome => (
                <option key={nome}>{nome}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              min={1}
              className="form-control"
              value={itemQtd}
              onChange={e => this.setState({ itemQtd: e.target.value })}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-outline-secondary" onClick={this.adicionarItem}>
              Add
            </button>
          </div>
        </div>


        {itens.length > 0 && (
          <ul className="list-group mb-3">
            {itens.map((it, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                {it.tipo} • {it.nome} × {it.qtd}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    this.setState(prev => ({
                      itens: prev.itens.filter((_, idx) => idx !== i)
                    }))
                  }
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <button className="btn btn-success" onClick={this.registrar}>
          Registrar
        </button>
      </div>
    );
  }
}

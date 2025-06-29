import { Component } from "react";

type Produto = { nome: string; valor: number };

type props = {
  tema: string;
  adicionarProduto?: (produto: Produto) => void;
  produto?: Produto;
  salvarEdicao?: (produto: Produto) => void;
};

type state = {
  nome: string;
  valor: number;
};

export default class FormularioCadastroProduto extends Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      nome: props.produto?.nome || "",
      valor: props.produto?.valor ?? 0
    };
  }

  handleInputChange = (campo: keyof state, valor: string | number) => {
    this.setState({ [campo]: valor } as Pick<state, keyof state>);
  };


  salvarProduto = () => {
    const { nome, valor } = this.state;
    if (!nome || valor <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }


    if (this.props.produto && this.props.salvarEdicao) {
      this.props.salvarEdicao({ nome, valor });
      alert("Produto atualizado com sucesso!");
    } else if (this.props.adicionarProduto) {
      this.props.adicionarProduto({ nome, valor });
      alert(`Produto "${nome}" cadastrado com sucesso!`);
    }


    if (!this.props.produto) {
      this.setState({ nome: "", valor: 0 });
    }
  };

  render() {
    const { tema, produto } = this.props;
    const { nome, valor } = this.state;

    return (
      <div className="container-fluid">
        <form>
          <h4 className="mb-3">
            {produto ? "Editar Produto" : "Cadastro de Produto"}
          </h4>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Produto"
              value={nome}
              onChange={(e) => this.handleInputChange("nome", e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" style={{ background: tema }}>
              R$
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="Valor"
              min={0}
              step="0.01"
              value={valor}
              onChange={(e) =>
                this.handleInputChange("valor", parseFloat(e.target.value))
              }
            />
          </div>

          <div className="input-group mb-3">
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{ background: tema }}
              onClick={this.salvarProduto}
            >
              {produto ? "Salvar alterações" : "Cadastrar Produto"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
import { Component } from "react";

type Servico = { nome: string; valor: number };

type props = {
    tema: string;
    adicionarServico?: (servico: Servico) => void;
    servico?: Servico;
    salvarEdicao?: (servico: Servico) => void;
};


type state = {
    nome: string;
    valor: number;
};

export default class FormularioCadastroServico extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            nome: props.servico?.nome || "",
            valor: props.servico?.valor ?? 0
        };

    }

    handleInputChange = (campo: keyof state, valor: string | number) => {
        this.setState({ [campo]: valor } as Pick<state, keyof state>);
    };

   salvarservico = () => {
    const { nome, valor } = this.state;
    if (!nome || valor <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }


    if (this.props.servico && this.props.salvarEdicao) {
      this.props.salvarEdicao({ nome, valor });
      alert("servico atualizado com sucesso!");
    } else if (this.props.adicionarServico) {
      this.props.adicionarServico({ nome, valor });
      alert(`Serviço "${nome}" cadastrado com sucesso!`);
    }


    if (!this.props.servico) {
      this.setState({ nome: "", valor: 0 });
    }
  };

  render() {
    const { tema, servico } = this.props;
    const { nome, valor } = this.state;

    return (
      <div className="container-fluid">
        <form>
          <h4 className="mb-3">
            {servico ? "Editar servico" : "Cadastro de servico"}
          </h4>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do servico"
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
              onClick={this.salvarservico}
            >
              {servico ? "Salvar alterações" : "Cadastrar servico"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
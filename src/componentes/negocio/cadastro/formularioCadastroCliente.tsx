import { Component } from "react";

type props = {
    tema: string;
    adicionarCliente?: (cliente: { nome: string; nomeSocial: string; cpf: string }) => void;
    cliente?: { nome: string; nomeSocial: string; cpf: string };
    salvarEdicao?: (cliente: { nome: string; nomeSocial: string; cpf: string }) => void;
};


type state = {
    nome: string;
    nomeSocial: string;
    cpf: string;
};

export default class FormularioCadastroCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            nome: props.cliente?.nome || '',
            nomeSocial: props.cliente?.nomeSocial || '',
            cpf: props.cliente?.cpf || ''
        };
    }


    handleInputChange = (campo: keyof state, valor: string) => {
        this.setState({
            [campo]: valor
        } as Pick<state, keyof state>);
    };


    salvarCliente = () => {
        const { nome, nomeSocial, cpf } = this.state;

        if (!nome || !nomeSocial || !cpf) {
            alert("Preencha todos os campos!");
            return;
        }

        const cliente = { nome, nomeSocial, cpf };

        if (this.props.cliente && this.props.salvarEdicao) {
            this.props.salvarEdicao(cliente);
            alert("Cliente atualizado com sucesso!");
        } else if (this.props.adicionarCliente) {
            this.props.adicionarCliente(cliente);
            alert(`Cliente "${nome}" cadastrado com sucesso!`);
        }

        this.setState({
            nome: '',
            nomeSocial: '',
            cpf: ''
        });
    };




    render() {
        const tema = this.props.tema;
        const { nome, nomeSocial, cpf } = this.state;

        return (
            <div className="container-fluid">
                <form>
                    <h4 className="mb-3">Cadastro de Cliente</h4>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => this.handleInputChange("nome", e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome Social"
                            value={nomeSocial}
                            onChange={e => this.handleInputChange("nomeSocial", e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" style={{ background: tema }}>
                            #
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="CPF"
                            value={cpf}
                            onChange={e => this.handleInputChange("cpf", e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            style={{ background: tema }}
                            onClick={this.salvarCliente}
                        >
                            {this.props.cliente ? 'Salvar alterações' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

import { Component } from "react";

type Pet = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    dono: string;
};

type props = {
    tema: string;
    clientes: Array<{ nome: string }>;
    adicionarPet?: (p: Pet) => void;
    pet?: Pet;
    salvarEdicao?: (p: Pet) => void;
};


type state = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    clienteSelecionado: string;
};

export default class FormularioCadastroPet extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            nome: props.pet?.nome || "",
            tipo: props.pet?.tipo || "",
            raca: props.pet?.raca || "",
            genero: props.pet?.genero || "",
            clienteSelecionado: props.pet?.dono || ""
        };
    }
    handleInputChange = (campo: keyof state, valor: string) => {
        this.setState({ [campo]: valor } as Pick<state, keyof state>);
    };

    salvarPet = () => {
        const { nome, tipo, raca, genero, clienteSelecionado } = this.state;
        if (!nome || !tipo || !raca || !genero || !clienteSelecionado) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoPet: Pet = {
            nome,
            tipo,
            raca,
            genero,
            dono: clienteSelecionado
        };

        if (this.props.pet && this.props.salvarEdicao) {
            this.props.salvarEdicao(novoPet);
            alert("Pet atualizado com sucesso!");
        } else if (this.props.adicionarPet) {
            this.props.adicionarPet(novoPet);
            alert(`Pet "${nome}" cadastrado com sucesso!`);
            this.setState({
                nome: "",
                tipo: "",
                raca: "",
                genero: "",
                clienteSelecionado: ""
            });
        }
    };

    render() {
        const tema = this.props.tema;
        const { nome, tipo, raca, genero, clienteSelecionado } = this.state;

        return (
            <div className="container-fluid">
                <form>
                    <h4 className="mb-3">Cadastro de Pet</h4>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Pet"
                            value={nome}
                            onChange={e => this.handleInputChange("nome", e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tipo (ex: Cachorro)"
                            value={tipo}
                            onChange={e => this.handleInputChange("tipo", e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Raça"
                            value={raca}
                            onChange={e => this.handleInputChange("raca", e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Gênero"
                            value={genero}
                            onChange={e => this.handleInputChange("genero", e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" style={{ background: tema }}>Cliente</label>
                        <select
                            className="form-select"
                            value={clienteSelecionado}
                            onChange={e => this.handleInputChange("clienteSelecionado", e.target.value)}
                        >
                            <option value="">Selecione um cliente</option>
                            {this.props.clientes.map((cliente, i) => (
                                <option key={i} value={cliente.nome}>{cliente.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.salvarPet}
                            style={{ background: tema }}
                        >
                            Cadastrar Pet
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
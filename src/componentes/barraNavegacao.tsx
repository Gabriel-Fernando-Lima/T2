/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type props = {
    tema: string,
    botoes: string[],
    seletorView: Function
}

export default class BarraNavegacao extends Component<props> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }


    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>
        } else {
            let lista = this.props.botoes.map(valor =>
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a>
                </li>
            )
            return lista
        }
    }

    render() {
        let tema = this.props.tema
        return (
            <>
                <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, marginBottom: 10 }}>
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">PetLovers</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {this.gerarListaBotoes()}

                                {/*Dropdown*/}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Cadastrar
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#" onClick={(e) => this.props.seletorView("CadastroCliente", e)}>Cliente</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => this.props.seletorView("CadastroProduto", e)}>Produto</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => this.props.seletorView("CadastroServico", e)}>Serviço</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => this.props.seletorView("CadastroPet", e)}>Pet</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={e => this.props.seletorView("RegistroConsumo", e)}>Registro de Consumo</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Estatísticas
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) => this.props.seletorView("Top10Consumo", e)}
                                            >
                                                Top 10 Consumo
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) => this.props.seletorView("Top5Gasto", e)}
                                            >
                                                Top 5 por Valor
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) => this.props.seletorView("ProdutosMaisConsumo", e)}
                                            >
                                                Produtos mais Consumidos
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) => this.props.seletorView("ServicosMaisConsumo", e)}
                                            >
                                                Serviços mais Consumidos
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) => this.props.seletorView("ConsumoTipoRaca", e)}
                                            >
                                                Consumo por Tipo/Raça
                                            </a>
                                        </li>

                                    </ul>
                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            </>
        )
    }
}
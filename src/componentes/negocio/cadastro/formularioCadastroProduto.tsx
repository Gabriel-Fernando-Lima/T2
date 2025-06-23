import { Component } from "react";

type props = {
    tema: string;
};

export default class FormularioCadastroProduto extends Component<props> {
    render() {
        const tema = this.props.tema;

        return (
            <div className="container-fluid">
                <form>
                    <h4 className="mb-3">Cadastro de Produto</h4>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Produto"
                            aria-label="Nome do Produto"
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
                            aria-label="Valor"
                            min={0}
                            step="0.01"
                        />
                    </div>

                    <div className="input-group mb-3">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            style={{ background: tema }}
                        >
                            Cadastrar Produto
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

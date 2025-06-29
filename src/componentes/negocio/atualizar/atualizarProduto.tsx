import { Component } from "react";
import FormularioCadastroProduto from "../cadastro/formularioCadastroProduto";

type Produto = { nome: string; valor: number };

type Props = {
    tema: string;
    produto: Produto;
    salvarEdicao: (p: Produto) => void;
    cancelar?: () => void;
};

export default class AtualizarProduto extends Component<Props> {
    render() {
        const { tema, produto, salvarEdicao, cancelar } = this.props;

        return (
            <div className="container-fluid">
                <h4 className="mb-3">Atualizar Produto</h4>
                
                <FormularioCadastroProduto
                    tema={tema}
                    produto={produto}            
                    salvarEdicao={salvarEdicao}
                />


                {cancelar && (
                    <button className="btn btn-outline-secondary mt-3" onClick={cancelar}>
                        Cancelar
                    </button>
                )}
            </div>
        );
    }
}
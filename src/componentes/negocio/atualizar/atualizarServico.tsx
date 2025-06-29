import { Component } from "react";
import FormularioCadastroServico from "../cadastro/formularioCadastroServico";

type Servico = { nome: string; valor: number };

type Props = {
    tema: string;
    servico: Servico;
    salvarEdicao: (s: Servico) => void;
    cancelar?: () => void;
};

export default class AtualizarServico extends Component<Props> {
    render() {
        const { tema, servico, salvarEdicao, cancelar } = this.props;

        return (
            <div className="container-fluid">
                <h4 className="mb-3">Atualizar Serviço</h4>

                <FormularioCadastroServico
                    tema={tema}
                    servico={servico}
                    salvarEdicao={salvarEdicao}
                />

                {cancelar && (
                    <button
                        className="btn btn-outline-secondary mt-3"
                        onClick={cancelar}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        );
    }
}

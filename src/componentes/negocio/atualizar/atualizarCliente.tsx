import { Component } from "react";
import FormularioCadastroCliente from "../cadastro/formularioCadastroCliente";

type Cliente = { nome: string; nomeSocial: string; cpf: string };

type Props = {
  tema: string;
  cliente: Cliente;                             
  salvarEdicao: (c: Cliente) => void;        
  cancelar?: () => void;                        
};

export default class AtualizarCliente extends Component<Props> {
  render() {
    const { tema, cliente, salvarEdicao, cancelar } = this.props;

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Atualizar Cliente</h4>


        <FormularioCadastroCliente
          tema={tema}
          cliente={cliente}
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

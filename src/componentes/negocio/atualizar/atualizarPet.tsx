import { Component } from "react";
import FormularioCadastroPet from "../cadastro/formularioCadastroPet";

type Pet = { nome: string; tipo: string; raca: string; genero: string; dono: string };

type Props = {
  tema: string;
  pet: Pet;
  clientes: Array<{ nome: string }>;
  salvarEdicao: (p: Pet) => void;
  cancelar?: () => void;
};

export default class AtualizarPet extends Component<Props> {
  render() {
    const { tema, pet, clientes, salvarEdicao, cancelar } = this.props;

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Atualizar Pet</h4>

        <FormularioCadastroPet
          tema={tema}
          clientes={clientes}
          pet={pet}
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

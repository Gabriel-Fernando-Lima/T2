import { Component } from "react";

type Pet = {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  dono: string;
};

type Props = {
  tema: string;
  pets: Pet[];
  editarPet?: (index: number) => void;
  excluirPet?: (index: number) => void;
};

export default class ListaPet extends Component<Props> {
  render() {
    const { pets, tema, editarPet, excluirPet } = this.props;

    if (pets.length === 0)
      return (
        <div className="container-fluid">
          <h4 className="mb-3">Lista de Pets</h4>
          <p>Nenhum pet cadastrado ainda.</p>
        </div>
      );


    const grupos: { [dono: string]: { pet: Pet; index: number }[] } = {};
    pets.forEach((pet, i) => {
      if (!grupos[pet.dono]) grupos[pet.dono] = [];
      grupos[pet.dono].push({ pet, index: i });
    });

    return (
      <div className="container-fluid">
        <h4 className="mb-3">Lista de Pets por Cliente</h4>

        {Object.entries(grupos).map(([dono, lista], g) => (
          <div key={g} className="mb-3">
            <h5 style={{ backgroundColor: tema }} className="p-2 rounded">
              {dono}
            </h5>
            <ul className="list-group">
              {lista.map(({ pet, index }) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>{pet.nome}</strong> — {pet.tipo}, {pet.raca},{" "}
                    {pet.genero}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => editarPet?.(index)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => excluirPet?.(index)} 
                  >
                    Excluir
                  </button>
                </li>

              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
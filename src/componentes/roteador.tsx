import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroServico from "./negocio/cadastro/formularioCadastroServico";
import FormularioCadastroPet from "./negocio/cadastro/formularioCadastroPet";
import ListaCliente from "./negocio/listagem/listaClientes";
import FormularioCadastroCliente from "./negocio/cadastro/formularioCadastroCliente";
import FormularioCadastroProduto from "./negocio/cadastro/formularioCadastroProduto";
import ListaProduto from "./negocio/listagem/listaProduto";
import ListaServico from "./negocio/listagem/listaServicos";
import ListaPet from "./negocio/listagem/listaPet";
import AtualizarCliente from "./negocio/atualizar/atualizarCliente";
import AtualizarProduto from "./negocio/atualizar/atualizarProduto";
import AtualizarServico from "./negocio/atualizar/atualizarServico";
import AtualizarPet from "./negocio/atualizar/atualizarPet";
import ListaConsumo from "./negocio/estatisticas/consumo";
import FormularioRegistroConsumo from "./negocio/venda/registroConsumo";
import Top10Consumo from "./negocio/estatisticas/top10Consumo";
import Top5Gasto from "./negocio/estatisticas/top5Gasto";
import ProdutosMaisConsumo from "./negocio/estatisticas/produtosMaisConsumo";
import ServicosMaisConsumo from "./negocio/estatisticas/servicosMaisConsumo";
import ConsumoTipoRaca from "./negocio/estatisticas/consumoTipoRaca";

type state = {
    tela: string;
    clientes: Array<{ nome: string; nomeSocial: string; cpf: string }>;
    produtos: Array<{ nome: string; valor: number }>;
    servicos: Array<{ nome: string; valor: number }>;
    pets: Array<{
        nome: string;
        tipo: string;
        raca: string;
        genero: string;
        dono: string;
    }>;
    clienteEditando: number | null,
    produtoEditando: number | null,
    servicoEditando: number | null,
    petEditando: number | null;

    consumos: Array<{
        clienteIndex: number;
        itens: { tipo: "produto" | "servico"; nome: string; qtd: number }[];
    }>;


};


export default class Roteador extends Component<{}, state> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: 'Clientes',
            clientes: [],
            produtos: [],
            servicos: [],
            pets: [],
            clienteEditando: null,
            produtoEditando: null,
            servicoEditando: null,
            petEditando: null,
            consumos: []
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.adicionarProduto = this.adicionarProduto.bind(this);
        this.adicionarServico = this.adicionarServico.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);


    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault();
        this.setState({ tela: novaTela });
    }

    adicionarCliente(cliente: { nome: string; nomeSocial: string; cpf: string }) {
        this.setState(prev => ({
            clientes: [...prev.clientes, cliente]
        }));
    }
    editarCliente = (index: number) => {
        this.setState({ clienteEditando: index, tela: 'EditarCliente' });
    };
    salvarEdicaoCliente = (clienteAtualizado: { nome: string; nomeSocial: string; cpf: string }) => {
        const index = this.state.clienteEditando;
        if (index === null) return;

        const clientesAtualizados = [...this.state.clientes];
        clientesAtualizados[index] = clienteAtualizado;

        this.setState({
            clientes: clientesAtualizados,
            clienteEditando: null,
            tela: 'Clientes'
        });
    };
    excluirCliente = (index: number) => {
        const cliente = this.state.clientes[index];

        const confirmar = window.confirm(
            `Tem certeza que deseja excluir o cliente "${cliente.nome}"?`
        );

        if (!confirmar) return;

        const clientesAtualizados = this.state.clientes.filter((_, i) => i !== index);

        this.setState({ clientes: clientesAtualizados });
    };


    adicionarProduto(produto: { nome: string; valor: number }) {
        this.setState(prev => ({
            produtos: [...prev.produtos, produto]
        }));
    }

    editarProduto = (index: number) => {
        this.setState({ produtoEditando: index, tela: "EditarProduto" });
    };

    salvarEdicaoProduto = (produtoAtualizado: { nome: string; valor: number }) => {
        const idx = this.state.produtoEditando;
        if (idx === null) return;
        const produtos = [...this.state.produtos];
        produtos[idx] = produtoAtualizado;
        this.setState({ produtos, produtoEditando: null, tela: "Produtos" });
    };
    excluirProduto = (index: number) => {
        const produto = this.state.produtos[index];
        if (!window.confirm(`Excluir o produto "${produto.nome}"?`)) return;

        this.setState(prev => ({
            produtos: prev.produtos.filter((_, i) => i !== index)
        }));
    };



    adicionarServico(servico: { nome: string; valor: number }) {
        this.setState(prev => ({
            servicos: [...prev.servicos, servico]
        }));
    }
    editarServico = (index: number) =>
        this.setState({ servicoEditando: index, tela: "EditarServico" });

    salvarEdicaoServico = (servicoAtualizado: { nome: string; valor: number }) => {
        const i = this.state.servicoEditando;
        if (i === null) return;
        const servicos = [...this.state.servicos];
        servicos[i] = servicoAtualizado;
        this.setState({ servicos, servicoEditando: null, tela: "Serviços" });
    };
    excluirServico = (index: number) => {
        const servico = this.state.servicos[index];
        if (!window.confirm(`Excluir o serviço "${servico.nome}"?`)) return;

        this.setState(prev => ({
            servicos: prev.servicos.filter((_, i) => i !== index)
        }));
    };



    adicionarPet(pet: { nome: string; tipo: string; raca: string; genero: string; dono: string }) {
        this.setState(prev => ({
            pets: [...prev.pets, pet]
        }));
    }
    editarPet = (index: number) =>
        this.setState({ petEditando: index, tela: "EditarPet" });

    salvarEdicaoPet = (petAtualizado: {
        nome: string; tipo: string; raca: string; genero: string; dono: string;
    }) => {
        const i = this.state.petEditando;
        if (i === null) return;
        const pets = [...this.state.pets];
        pets[i] = petAtualizado;
        this.setState({ pets, petEditando: null, tela: "Pets" });
    };
    excluirPet = (index: number) => {
        const pet = this.state.pets[index];
        if (!window.confirm(`Excluir o pet "${pet.nome}" do(a) ${pet.dono}?`)) return;

        this.setState(prev => ({
            pets: prev.pets.filter((_, i) => i !== index)
        }));
    };

    registrarConsumo = (cons: {
        clienteIndex: number;
        itens: { tipo: "produto" | "servico"; nome: string; qtd: number }[];
    }) => {
        this.setState(prev => ({ consumos: [...prev.consumos, cons], tela: "Consumos" }));
    };


    render() {
        const barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="#e3f2fd"
                botoes={['Clientes', 'Produtos', 'Serviços', 'Pets', 'Consumos']}
            />
        );

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="#e3f2fd" clientes={this.state.clientes} editarCliente={this.editarCliente} excluirCliente={this.excluirCliente} />
                </>
            );
        } else if (this.state.tela === 'CadastroCliente') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="#e3f2fd" adicionarCliente={this.adicionarCliente} />
                </>
            );
        } else if (this.state.tela === 'EditarCliente' && this.state.clienteEditando !== null) {
            const cliente = this.state.clientes[this.state.clienteEditando];
            return (
                <>
                    {barraNavegacao}
                    <AtualizarCliente
                        tema="#e3f2fd"
                        cliente={cliente}
                        salvarEdicao={this.salvarEdicaoCliente}
                        cancelar={() => this.setState({ tela: 'Clientes', clienteEditando: null })}
                    />
                </>
            );
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    <ListaProduto tema="#e3f2fd" produtos={this.state.produtos} editarProduto={this.editarProduto} excluirProduto={this.excluirProduto} />
                </>
            );
        } else if (this.state.tela === 'CadastroProduto') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProduto tema="#e3f2fd" adicionarProduto={this.adicionarProduto} />
                </>
            );
        } else if (this.state.tela === 'EditarProduto' && this.state.produtoEditando !== null) {
            const produto = this.state.produtos[this.state.produtoEditando];
            return (
                <>
                    {barraNavegacao}
                    <AtualizarProduto
                        tema="#e3f2fd"
                        produto={produto}
                        salvarEdicao={this.salvarEdicaoProduto}
                        cancelar={() => this.setState({ tela: 'Produtos', produtoEditando: null })}
                    />
                </>
            );
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaServico
                        tema="#e3f2fd"
                        servicos={this.state.servicos}
                        editarServico={this.editarServico}
                        excluirServico={this.excluirServico}
                    />
                </>
            );
        } else if (this.state.tela === 'CadastroServico') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroServico tema="#e3f2fd" adicionarServico={this.adicionarServico} />
                </>
            );
        } else if (this.state.tela === "EditarServico" && this.state.servicoEditando !== null) {
            const servico = this.state.servicos[this.state.servicoEditando];
            return (
                <>
                    {barraNavegacao}
                    <AtualizarServico
                        tema="#e3f2fd"
                        servico={servico}
                        salvarEdicao={this.salvarEdicaoServico}
                        cancelar={() => this.setState({ tela: "Serviços", servicoEditando: null })}
                    />
                </>
            );
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <ListaPet
                        tema="#e3f2fd"
                        pets={this.state.pets}
                        editarPet={this.editarPet}
                        excluirPet={this.excluirPet}
                    />
                </>
            );
        } else if (this.state.tela === 'CadastroPet') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroPet
                        tema="#e3f2fd"
                        clientes={this.state.clientes}
                        adicionarPet={this.adicionarPet}
                    />
                </>
            );
        } else if (this.state.tela === "EditarPet" && this.state.petEditando !== null) {
            const pet = this.state.pets[this.state.petEditando];
            return (
                <>
                    {barraNavegacao}
                    <AtualizarPet
                        tema="#e3f2fd"
                        pet={pet}
                        clientes={this.state.clientes}
                        salvarEdicao={this.salvarEdicaoPet}
                        cancelar={() => this.setState({ tela: "Pets", petEditando: null })}
                    />
                </>
            );
        } else if (this.state.tela === "Consumos") {
            return (
                <>
                    {barraNavegacao}
                    <ListaConsumo
                        tema="#e3f2fd"
                        clientes={this.state.clientes}
                        consumos={this.state.consumos}
                    />
                </>
            );
        } else if (this.state.tela === "RegistroConsumo") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioRegistroConsumo
                        tema="#e3f2fd"
                        clientes={this.state.clientes}
                        produtos={this.state.produtos}
                        servicos={this.state.servicos}
                        registrarConsumo={this.registrarConsumo}
                    />
                </>
            );
        } else if (this.state.tela === "Top10Consumo") {
            return (
                <>
                    {barraNavegacao}
                    <Top10Consumo
                        tema="#e3f2fd"
                        clientes={this.state.clientes}
                        consumos={this.state.consumos}
                    />
                </>
            );
        } else if (this.state.tela === "Top5Gasto") {
            return (
                <>
                    {barraNavegacao}
                    <Top5Gasto
                        tema="#e3f2fd"
                        clientes={this.state.clientes}
                        produtos={this.state.produtos}
                        servicos={this.state.servicos}
                        consumos={this.state.consumos}
                    />
                </>
            );
        } else if (this.state.tela === "ProdutosMaisConsumo") {
            return (
                <>
                    {barraNavegacao}
                    <ProdutosMaisConsumo
                        tema="#e3f2fd"
                        produtos={this.state.produtos}
                        consumos={this.state.consumos}
                    />
                </>
            );
        } else if (this.state.tela === "ServicosMaisConsumo") {
            return (
                <>
                    {barraNavegacao}
                    <ServicosMaisConsumo
                        tema="#e3f2fd"
                        consumos={this.state.consumos}
                    />
                </>
            );
        } else if (this.state.tela === "ConsumoTipoRaca") {
            return (
                <>
                    {barraNavegacao}
                    <ConsumoTipoRaca
                        tema="#e3f2fd"
                        clientes={this.state.clientes}
                        pets={this.state.pets}
                        consumos={this.state.consumos}
                    />
                </>
            );
        }
        return (
            <>
                {barraNavegacao}
                <p className="text-center mt-5">Tela não encontrada</p>
            </>
        );
    }
}
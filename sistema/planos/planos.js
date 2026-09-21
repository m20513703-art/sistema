function escolherPlano(numeroPlano) {

    const clienteSalvo = localStorage.getItem("cliente");

    if (!clienteSalvo) {
        alert("Cadastro não encontrado.");
        window.location.href = "../Cadastro/cadastro.html";
        return;
    }

    const cliente = JSON.parse(clienteSalvo);

    let plano;

    if (numeroPlano === 1) {
        plano = {
            numero: 1,
            nome: "Plano 1",
            descricao: "Site profissional",
            valor: 100
        };
    }

    if (numeroPlano === 2) {
        plano = {
            numero: 2,
            nome: "Plano 2",
            descricao: "Site + Sistema de Vendas",
            valor: 150
        };
    }

    if (numeroPlano === 3) {
        plano = {
            numero: 3,
            nome: "Plano 3",
            descricao: "Site + Vendas + PDV Financeiro",
            valor: 200
        };
    }

    cliente.plano = plano;
    cliente.pagamento = false;
    cliente.testeGratis = true;

    localStorage.setItem("cliente", JSON.stringify(cliente));

    window.location.href = "../Pagamento/pagamento.html";
}
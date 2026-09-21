const nomePlano =
    document.getElementById("nomePlano");

const descricaoPlano =
    document.getElementById("descricaoPlano");

const valorPlano =
    document.getElementById("valorPlano");

const botaoPagamento =
    document.getElementById("botaoPagamento");

const mensagem =
    document.getElementById("mensagem");


const clienteSalvo =
    localStorage.getItem("cliente");


/* ================================
   VERIFICAR CADASTRO
================================ */

if (!clienteSalvo) {

    mensagem.textContent =
        "Cadastro não encontrado.";

    mensagem.style.color =
        "#d00000";

    botaoPagamento.disabled =
        true;

} else {

    let cliente;

    try {

        cliente =
            JSON.parse(clienteSalvo);

    } catch (erro) {

        mensagem.textContent =
            "Erro nos dados do cadastro.";

        mensagem.style.color =
            "#d00000";

        botaoPagamento.disabled =
            true;

        cliente = null;
    }


    if (cliente) {

        if (!cliente.plano) {

            mensagem.textContent =
                "Nenhum plano foi selecionado.";

            mensagem.style.color =
                "#d00000";

            botaoPagamento.disabled =
                true;

        } else {

            nomePlano.textContent =
                cliente.plano.nome;

            descricaoPlano.textContent =
                cliente.plano.descricao;

            valorPlano.textContent =
                "R$ " +
                Number(cliente.plano.valor)
                    .toFixed(2)
                    .replace(".", ",");
        }
    }
}


/* ================================
   FINALIZAR ASSINATURA
================================ */

botaoPagamento.addEventListener(
    "click",
    function () {

        const clienteAtual =
            localStorage.getItem("cliente");


        if (!clienteAtual) {

            mensagem.textContent =
                "Cadastro não encontrado.";

            mensagem.style.color =
                "#d00000";

            return;
        }


        let cliente;

        try {

            cliente =
                JSON.parse(clienteAtual);

        } catch (erro) {

            mensagem.textContent =
                "Erro nos dados do cadastro.";

            mensagem.style.color =
                "#d00000";

            return;
        }


        if (!cliente.plano) {

            mensagem.textContent =
                "Nenhum plano foi selecionado.";

            mensagem.style.color =
                "#d00000";

            return;
        }


        /* ================================
           INÍCIO DOS 14 DIAS
        ================================= */

        const dataInicio =
            new Date();

        const dataFim =
            new Date(dataInicio);

        dataFim.setDate(
            dataFim.getDate() + 14
        );


        cliente.dataInicio =
            dataInicio.toISOString();

        cliente.dataFimTeste =
            dataFim.toISOString();


        /* ================================
           STATUS DA ASSINATURA
        ================================= */

        cliente.testeGratis =
            true;

        cliente.assinatura =
            "teste";

        cliente.acessoLiberado =
            true;

        cliente.pagamento =
            false;

        cliente.statusPagamento =
            "aguardando_renovacao";


        /* ================================
           SALVAR CLIENTE
        ================================= */

        localStorage.setItem(
            "cliente",
            JSON.stringify(cliente)
        );

        localStorage.setItem(
            "usuarioLogado",
            "true"
        );


        mensagem.textContent =
            "Tudo certo! Seus 14 dias grátis começaram.";

        mensagem.style.color =
            "#198754";


        botaoPagamento.disabled =
            true;


        /* ================================
           IR PARA O PAINEL
        ================================= */

        setTimeout(function () {

            window.location.href =
                "../Painel/painel.html";

        }, 1000);

    }
);
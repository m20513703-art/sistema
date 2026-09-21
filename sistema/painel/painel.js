const clienteSalvo = localStorage.getItem("cliente");


// ========================================
// VERIFICAR CLIENTE
// ========================================

if (!clienteSalvo) {

    window.location.href =
        "../Login/login.html";

} else {

    let cliente;

    try {

        cliente =
            JSON.parse(clienteSalvo);

    } catch (erro) {

        localStorage.removeItem("cliente");
        localStorage.removeItem("usuarioLogado");

        window.location.href =
            "../Login/login.html";

        throw erro;
    }


    // ========================================
    // ELEMENTOS DO PAINEL
    // ========================================

    const nomeCliente =
        document.getElementById("nomeCliente");

    const nomeEmpresa =
        document.getElementById("nomeEmpresa");

    const planoCliente =
        document.getElementById("planoCliente");

    const testeGratis =
        document.getElementById("testeGratis");

    const recursoSite =
        document.getElementById("recursoSite");

    const recursoPedidos =
        document.getElementById("recursoPedidos");

    const recursoFinanceiro =
        document.getElementById("recursoFinanceiro");

    const botaoSair =
        document.getElementById("botaoSair");

    const botaoCancelar =
        document.getElementById("botaoCancelar");


    // ========================================
    // INFORMAÇÕES DO CLIENTE
    // ========================================

    if (nomeCliente) {

        nomeCliente.textContent =
            cliente.nome || "---";

    }

    if (nomeEmpresa) {

        nomeEmpresa.textContent =
            cliente.empresa || "---";

    }


    // ========================================
    // PLANO
    // ========================================

    if (planoCliente) {

        if (cliente.plano) {

            const valor =
                Number(cliente.plano.valor || 0);

            planoCliente.textContent =
                cliente.plano.nome +
                " - R$ " +
                valor.toFixed(2).replace(".", ",") +
                "/mês";

        } else {

            planoCliente.textContent =
                "Nenhum plano";

        }

    }


    // ========================================
    // TESTE GRÁTIS
    // ========================================

    if (testeGratis) {

        if (cliente.testeGratis === true) {

            testeGratis.textContent =
                "14 dias grátis";

        } else {

            testeGratis.textContent =
                "Teste encerrado";

        }

    }


    // ========================================
    // LIBERAÇÃO DOS RECURSOS
    // ========================================

    if (cliente.plano) {

        const numeroPlano =
            Number(cliente.plano.numero);


        // SITE
        if (recursoSite) {

            recursoSite.classList.remove(
                "bloqueado"
            );

        }


        // ========================================
        // PLANO 2 E 3
        // ========================================

        if (numeroPlano >= 2) {

            if (recursoPedidos) {

                recursoPedidos.classList.remove(
                    "bloqueado"
                );

            }

            const textoPedidos =
                document.getElementById(
                    "textoPedidos"
                );

            if (textoPedidos) {

                textoPedidos.textContent =
                    "Controle de pedidos disponível.";

            }

        }


        // ========================================
        // PLANO 3
        // ========================================

        if (numeroPlano === 3) {

            if (recursoFinanceiro) {

                recursoFinanceiro.classList.remove(
                    "bloqueado"
                );

            }

            const textoFinanceiro =
                document.getElementById(
                    "textoFinanceiro"
                );

            if (textoFinanceiro) {

                textoFinanceiro.textContent =
                    "Controle financeiro disponível.";

            }

        }

    }


    // ========================================
    // ACESSAR SITE
    // ========================================

    window.acessarSite =
        function () {

            if (!cliente.plano) {

                alert(
                    "Nenhum plano foi selecionado."
                );

                return;
            }

            window.location.href =
                "https://m20513703-art.github.io/climatizacao/";

        };


    // ========================================
    // ACESSAR PDV PEDIDOS
    // ========================================

    window.acessarPedidos =
        function () {

            if (
                !cliente.plano ||
                Number(cliente.plano.numero) < 2
            ) {

                alert(
                    "O PDV de pedidos está disponível a partir do Plano 2."
                );

                return;
            }

            window.location.href =
                "https://m20513703-art.github.io/pedidos/";

        };


    // ========================================
    // ACESSAR PDV FINANCEIRO
    // ========================================

    window.acessarFinanceiro =
        function () {

            if (
                !cliente.plano ||
                Number(cliente.plano.numero) < 3
            ) {

                alert(
                    "O PDV financeiro está disponível somente no Plano 3."
                );

                return;
            }

            window.location.href =
                "https://m20513703-art.github.io/finaceiro/";

        };


    // ========================================
    // BOTÃO SAIR
    // ========================================

    if (botaoSair) {

        botaoSair.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "usuarioLogado"
                );

                window.location.href =
                    "../Login/login.html";

            }
        );

    }


    // ========================================
    // CANCELAR PLANO
    // ========================================

    if (botaoCancelar) {

        botaoCancelar.addEventListener(
            "click",
            function () {

                const confirmar =
                    confirm(
                        "Tem certeza que deseja cancelar o plano?\n\n" +
                        "Se você cancelar durante os 14 dias grátis, " +
                        "nenhuma cobrança será realizada."
                    );


                if (!confirmar) {

                    return;

                }


                cliente.plano =
                    null;

                cliente.pagamento =
                    false;

                cliente.testeGratis =
                    false;

                cliente.assinatura =
                    "cancelada";

                cliente.acessoLiberado =
                    false;

                cliente.statusPagamento =
                    "cancelado";


                localStorage.setItem(
                    "cliente",
                    JSON.stringify(cliente)
                );


                alert(
                    "Plano cancelado com sucesso."
                );


                window.location.href =
                    "../Login/login.html";

            }
        );

    }

}
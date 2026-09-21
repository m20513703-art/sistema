const formLogin = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

formLogin.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const clienteSalvo = localStorage.getItem("cliente");

    if (!clienteSalvo) {
        mensagem.textContent = "Nenhum cadastro encontrado.";
        mensagem.style.color = "#d00000";
        return;
    }

    let cliente;

    try {
        cliente = JSON.parse(clienteSalvo);
    } catch (erro) {
        mensagem.textContent = "Erro nos dados do cadastro.";
        mensagem.style.color = "#d00000";
        return;
    }

    if (
        email.toLowerCase() !== cliente.email.toLowerCase() ||
        senha !== cliente.senha
    ) {
        mensagem.textContent = "E-mail ou senha incorretos.";
        mensagem.style.color = "#d00000";
        return;
    }

    // Marca o usuário como logado
    localStorage.setItem("usuarioLogado", "true");

    // Guarda o e-mail do usuário logado
    localStorage.setItem("emailUsuarioLogado", cliente.email);

    mensagem.textContent = "Login realizado com sucesso!";
    mensagem.style.color = "#008000";

    setTimeout(function () {

        // Depois do login, vai para a escolha dos planos
        window.location.href = "../Planos/planos.html";

    }, 1000);

});
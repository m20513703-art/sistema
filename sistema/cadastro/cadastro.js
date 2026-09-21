const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

formCadastro.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const empresa = document.getElementById("empresa").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        return;
    }

    const cliente = {
        nome: nome,
        empresa: empresa,
        email: email,
        telefone: telefone,
        senha: senha,
        plano: null,
        pagamento: false,
        testeGratis: true
    };

    localStorage.setItem("cliente", JSON.stringify(cliente));

    mensagem.textContent = "Cadastro realizado com sucesso!";

    setTimeout(function () {
        window.location.href = "../Login/login.html";
    }, 1000);

});
$(document).ready(function(){
    $('#telefone').mask('(00) 0000-0000');
});

function validaValues() {
        
    function null_or_empty(str) {
        var value = document.getElementById(str).value;
        return value == null || value == "";
    }
    
    // Valida se há campos vazios
    if (null_or_empty("nome")
            || null_or_empty("email")
            || null_or_empty("telefone")
            || null_or_empty("assunto")
            || null_or_empty("mensagem")) {
                alert('Por favor, preencha todos os campos.');
                event.preventDefault()
                return false;
            }

        // Valida se o campo email está preenchido corretamente
        var email = document.getElementById("email").value;
        if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
            alert('Por favor, insira um email válido.');
                event.preventDefault()
                return false;
        }

        // Valida se o campo telefone está preenchido corretamente
        var tel = document.getElementById("telefone").value;
        if (tel.length < 10) {
            alert('Por favor, insira um telefone válido.');
                event.preventDefault()
                return false;
        }

        alert('Formulário salvo com sucesso!');
}

function salvaForm(e) {
    
    validaValues();
    
    if (localStorage.cont) {
        localStorage.cont = Number(localStorage.cont)+1;
     } else {
        localStorage.cont = 1;
     }

    nome = document.getElementById('nome').value;
    email = document.getElementById('email').value;
    tel = document.getElementById('telefone').value;
    assunto = document.getElementById('assunto').value;
    msg = document.getElementById('mensagem').value;


    var testObject = { 'nome': nome, 'email': email, 'telefone': tel, 'assunto': assunto, "mensagem": msg };

    // Coloca o objeto no  storage
    localStorage.setItem('dadosForm'+localStorage.cont, JSON.stringify(testObject));

}

function recuperaForm() {

    // Limpa o form que está na tela, para trazer outro form
    document.getElementById("form").innerHTML = ""

    // Pega o ID informado pelo usuário
    idForm = document.getElementById('idForm').value

    // Valida se o ID informado existe no localStorage
    if (localStorage.getItem("dadosForm"+idForm) == null) {
        alert('Por favor, informe um ID válido!');
        event.preventDefault()
        return false;
    }

    // Cria o Form com todos os dados referentes ao ID informado pelo usuário
    $('form#form').append(
                     '<div class="form-group">' +
                         '<label class="lbl-get-form">Formulário ID: dadosForm' + idForm + '</label>' +
                         '<br>' +
                         '<label>Nome</label>' +
                         '<input type="text" class="form-control form-control-custom" id="nome" value="' + JSON.parse(localStorage.getItem("dadosForm"+idForm)).nome +'">' +
                     '</div>' +
                     '<div class="form-group">' +
                         '<label>Email</label>' +
                         '<input type="email" class="form-control form-control-custom" id="email" value="' + JSON.parse(localStorage.getItem("dadosForm"+idForm)).email +'">' +
                     '</div>' +
                     '<div class="form-group">' +
                         '<label>Telefone</label>' +
                         '<input type="text" class="form-control form-control-custom" id="telefone" name="telefone" data-mask="(00) 0000-0000" data-mask-selectonfocus="true" value="' + JSON.parse(localStorage.getItem("dadosForm"+idForm)).telefone +'">' +
                     '</div>' +
                     '<div class="form-group">' +
                         '<label>Assunto</label>' +
                        '<input type="text" class="form-control form-control-custom" id="assunto" value="' + JSON.parse(localStorage.getItem("dadosForm"+idForm)).assunto +'">' +
                     '</div>' +
                     '<div class="form-group">' +
                         '<label>Mensagem</label>' +
                         '<input type="text-area" class="form-control form-control-custom" id="mensagem" value="' + JSON.parse(localStorage.getItem("dadosForm"+idForm)).mensagem +'">' +
                     '</div>' +
                     '<button type="submit" class="btn btn-primary btn-custom" onclick="atualizaForm()">Atualizar Valores</button>' +
                     '<button type="submit" class="btn btn-primary btn-custom btn-cancelar" onclick="cancelar()">Cancelar</button>');

}

function atualizaForm(e) {

    validaValues();
    
    // Pega o ID informado pelo usuário
    idForm = document.getElementById('idForm').value

    nome = document.getElementById('nome').value;
    email = document.getElementById('email').value;
    tel = document.getElementById('telefone').value;
    assunto = document.getElementById('assunto').value;
    msg = document.getElementById('mensagem').value;


    var testObject = { 'nome': nome, 'email': email, 'telefone': tel, 'assunto': assunto, "mensagem": msg };

    // Atualiza o objeto no storage
    localStorage.setItem('dadosForm' + idForm, JSON.stringify(testObject));

}

function cancelar() {
    // Limpa o form que está na tela
    document.getElementById("form").innerHTML = ""
}
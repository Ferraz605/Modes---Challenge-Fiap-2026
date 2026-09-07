import {InicializarUsuario,CriandoUsuario,obterUsuariosSalvos} from './dados.js'

const usuario = document.getElementById('usuarioLogin');
const email = document.getElementById('emailLogin');
const senha = document.getElementById('senhaLogin');
const checkBoxCadastro = document.getElementById('checkboxLogin');

const imagemUsuario = document.getElementById('imagem_Usuario');
const imagemEmail = document.getElementById('imagem_Email');
const imagemSenha = document.getElementById('imagem_Senha');

const usuarioText = document.getElementById('UsuarioText');
const emailText = document.getElementById('EmailText');
const senhaText = document.getElementById('SenhaText');
const checkBoxTexto = document.getElementById('checkbox_Text');

const headerText = document.getElementById('Header_Text');

const buttonCadastro = document.getElementById('Button_Cadastrar');

InicializarUsuario();

function LimparCampos() {
    usuarioText.className = 'text-2xl text-white';
    emailText.className = 'text-2xl text-white';
    senhaText.className = 'text-2xl text-white';
    checkBoxTexto.className = 'text-white';

    usuarioText.textContent = 'Usuario';
    emailText.textContent = 'Email';
    senhaText.textContent = 'Senha';

    headerText.textContent = '';
    usuario.textContent = '';
    email.textContent = '';
    senha.textContent = '';
   
    imagemUsuario.src = '../img/Icon_Usuario_LC.png';
    imagemEmail.src = '../img/Icon_Email_LC.png';
    imagemSenha.src = '../img/Icon_Senha_LC.png';
}

function marcarErro(campoInput, campoTexto) {
    campoTexto.className = 'text-2xl text-[#e05353]';

    campoInput.classList.remove('animate-shake');
    void campoInput.offsetWidth;
    campoInput.classList.add('animate-shake');
}

buttonCadastro.addEventListener('click', () => {

    LimparCampos();

    const objUsuario = obterUsuariosSalvos();

    if (usuario.value === '') {
        marcarErro(usuario, usuarioText);
        imagemUsuario.src = '../img/Icon_UsuarioError.png';
        usuarioText.textContent = 'Usuario *'
    } else if (email.value === '') {
        marcarErro(email, emailText);
        imagemEmail.src = '../img/Icon_EmailError.png';
        emailText.textContent = 'Email *'
    } else if (senha.value === '') {
        marcarErro(senha, senhaText);
        imagemSenha.src = '../img/Icon_SenhaError.png';
        senhaText.textContent = 'Senha *'
    } else if (checkBoxCadastro.checked === false) {
        checkBoxTexto.className = 'text-[#e05353]';

        checkBoxTexto.classList.remove('animate-shake');
        void checkBoxTexto.offsetWidth;
        checkBoxTexto.classList.add('animate-shake');
    }else if(objUsuario.some(VerEmail => {
        return VerEmail.email.trim() === email.value.trim();
    })) {
        headerText.textContent = 'Esse email já existe';
        headerText.className = 'text-[#e05353] text-2xl';

        headerText.classList.remove('animate-shake');
        void headerText.offsetWidth;
        headerText.classList.add('animate-shake');
    }else {
        headerText.textContent = 'Prontinho, bem-vindo!';
        headerText.className = 'text-[#02aa6d] text-2xl';

        setTimeout(() => {
            CriandoUsuario(usuario.value, email.value, senha.value);
            window.location.href = 'Login.html';            
        }, 1000);

    }

})



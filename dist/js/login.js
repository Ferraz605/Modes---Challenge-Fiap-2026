import {obterUsuariosSalvos} from './dados.js'

const email = document.getElementById('emailLogin');
const senha = document.getElementById('senhaLogin');

const emailText = document.getElementById('EmailText');
const senhaText = document.getElementById('SenhaText');

const imagemEmail = document.getElementById('imagem_Email');
const imagemSenha = document.getElementById('imagem_Senha');

const buttonEntrar = document.getElementById('Button_Entrar');

function LimparCampos () {
    emailText.className = 'text-2xl text-white';
    senhaText.className = 'text-2xl text-white';

    imagemEmail.src = '../img/Icon_Email_LC.png';
    imagemSenha.src = '../img/Icon_Senha_LC.png';
}

function marcarErro(campoInput, campoTexto) {
    campoTexto.className = 'text-2xl text-[#e05353]';

    campoInput.classList.remove('animate-shake');
    void campoInput.offsetWidth;
    campoInput.classList.add('animate-shake');
}

buttonEntrar.addEventListener('click', () => {
    LimparCampos ();

    const usuariosSalvos = obterUsuariosSalvos();
    const usuarioEncontrado = usuariosSalvos.find(User => User.email === email.value)

    if(email.value === '' || usuarioEncontrado === undefined) {
        marcarErro(email,emailText)
        imagemEmail.src = '../img/Icon_EmailError.png'

    } else if (senha.value === '' || usuarioEncontrado.senha !== senha.value) {
        marcarErro(senha,senhaText);
        imagemSenha.src = '../img/Icon_SenhaError.png'
    }else {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        window.location.href = 'Explorador.html';
    }

})


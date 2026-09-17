import {obterCategoriasSalvas,obterModosSalvos,obterModosProSalvos,InicializarComentarios,obterComentariosSalvos,CriandoComentario,obterUsuariosSalvos,
    InicializarCurtidas,obterCurtidasSalvas,AdicionandoCurtida
} from './dados.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const idModo = Number(urlParams.get('id'));

const configSeta = document.getElementById('Config_Seta');
const configProSeta = document.getElementById('ConfigPro_Seta');

const configOpcoes = document.getElementById('Config_Opcoes');
const configProOpcoes = document.getElementById('configProOpcoes');

const configImagem = document.getElementById('configImagem');
const configProImagem = document.getElementById('configProImagem');

const usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado')) ?? 0;

let ConfigSelecionada = 'Selecionada';
let ConfigProSelecionada = 'Selecionada';

const novoComentarioInput = document.getElementById('NovoComentarioInput');
const buttonEnviarComentario = document.getElementById('Button_EnviarComentario');

const iconCoracaoUm = document.getElementById('coracaoUm');
const CurtirModo = document.getElementById('Curtir_Modo');

InicializarCurtidas();

buttonEnviarComentario.addEventListener('click', () => {

    if (novoComentarioInput.value === '') {
        novoComentarioInput.focus();
        novoComentarioInput.classList.remove('animate-shake');
        void novoComentarioInput.offsetWidth; 
        novoComentarioInput.classList.add('animate-shake');
    } else{
        CriandoComentario(idModo, usuarioAtual.id, novoComentarioInput.value);
        ExibirComentarios();
        novoComentarioInput.value = '';
    }
})

function ExcluirComentario (idComentario) {
    const objComentario = obterComentariosSalvos();

    const objComentarioFiltrado = objComentario.filter(comentario => comentario.id_comentario !== idComentario);
    localStorage.setItem('comentarios', JSON.stringify(objComentarioFiltrado));
}

function ExibirComentarios() {
    const listaComentarios = document.getElementById('DetalheComentarios');
    listaComentarios.innerHTML = '';

    const objComentario = obterComentariosSalvos();
    const usuarios = obterUsuariosSalvos();

    const comentarioFiltrado = objComentario.filter(c => c.id_modo === idModo);

    if(comentarioFiltrado.length === 0 ){ 
        const item = document.createElement('div');
        item.className = 'flex flex-row items-start gap-5';

        item.innerHTML = `<h2 class = "text-lg opacity-80">Sem Comentarios</h2>`;
        listaComentarios.appendChild(item);
    } else {

        comentarioFiltrado.forEach(comentario => {
        const usuario = usuarios.find(u => u.id === comentario.id_usuario);

        const item = document.createElement('div');
        item.className = 'flex flex-row items-start gap-5';

        item.innerHTML = `
            <img src="${usuario.fotoPerfil}" class="w-8 h-8 rounded-full object-cover shrink-0">
            <div class="flex flex-row flex-wrap justify-between w-full gap-2 items-baseline">
            <div>
                <span class="text-white  text-lg font-bold">@${usuario.nome}</span>
                <span class="text-white/80 text-lg">${comentario.ds_comentario}</span>            
            </div>
                <img src="../img/Sair_Icon.png" alt="Icone de Sair" class="w-4 cursor-pointer hidden apagarComentario">
            </div>
        `;        
        const botaoApagar = item.querySelector('.apagarComentario');

        if (usuarioAtual.id === comentario.id_usuario) {
            botaoApagar.classList.remove('hidden');
        } else {
            botaoApagar.classList.add('hidden');
        }

        botaoApagar.addEventListener('click', () => {
            ExcluirComentario(comentario.id_comentario)
            ExibirComentarios();
        })

        listaComentarios.appendChild(item); 
        
    });        
    }
}

function AlternarCuritdas () {
    const objCurtida = obterCurtidasSalvas();

    const jaCurtiu = objCurtida.find(c => c.idUsuario === usuarioAtual.id && c.idModo === idModo);

    if(jaCurtiu){
        const curtidasAtualizadas = objCurtida.filter(c => !(c.idUsuario === usuarioAtual.id && c.idModo === idModo));
        localStorage.setItem('curtidas', JSON.stringify(curtidasAtualizadas));  
        CurtirModo.classList.remove('bg-[#FF3B5C]')
        CurtirModo.classList.add('bg-[#55586C]/90')
        ExibirModos();
    } else {
        CurtirModo.classList.remove('bg-[#55586C]/90')
        CurtirModo.classList.add('bg-[#FF3B5C]')        
        AdicionandoCurtida(idModo,usuarioAtual.id)
        ExibirModos();
    }
}

iconCoracaoUm.addEventListener('click', AlternarCuritdas);
CurtirModo.addEventListener('click', AlternarCuritdas);


function ExibirModos() {
    const categorias = obterCategoriasSalvas();
    const modosPro = obterModosProSalvos();
    const modos = obterModosSalvos();
    const curtidas = obterCurtidasSalvas();
    
    const modoFiltrado = modos.find(m => m.id_modo === idModo);
    const categoriaFiltrada = categorias.find(c => c.id === modoFiltrado.id_categoria);
    const curtidasFiltradas = curtidas.filter(c => c.idModo === modoFiltrado.id_modo);
    const usuarioJaCurtiu = curtidasFiltradas.some(c => c.idUsuario === usuarioAtual.id);

    const camposTexto = {
        DetalheNome: modoFiltrado.nome,
        DetalheUsuario: `por @${modoFiltrado.nome_usuario}` ,
        DetalheCurtidas: curtidasFiltradas.length,
        DetalheDescricao: `${modoFiltrado.descricao}` ?? 'Sem descrição',
        DetalheCategoria: categoriaFiltrada.nome,
        DetalheBrilho: modoFiltrado.brilho ?? 0,
        DetalheContraste: modoFiltrado.contraste ?? 0,
        DetalheTemperatura: modoFiltrado.temperatura ?? 0,
        DetalheSaturacao: modoFiltrado.saturacao ?? 0
    };

for (const [Texto, valor] of Object.entries(camposTexto)) {
    const elemento = document.getElementById(Texto);
    elemento.textContent = valor;
}

document.getElementById('Imagem_Post_Detalhe').src = categoriaFiltrada.icone;
document.getElementById('Div_Post_Detalhe').className = `${categoriaFiltrada.corFundo} m-5 h-50 flex items-center justify-center`;

if(usuarioJaCurtiu) {
    iconCoracaoUm.src = '../img/Icon_CoracaoCheio.png';
} else {
    iconCoracaoUm.src = '../img/Icon_Coracao.png';
}

const configPro = modosPro.find(mp => mp.id_modo === modoFiltrado.id_modo);

if (configPro) {
    document.getElementById('DetalhePro').classList.remove('hidden');
    document.getElementById('DetalheConfigPro_Bloco').classList.remove('hidden');

    const camposTextoPro = {
        DetalheISO: configPro.iso ?? 0,
        DetalheObturador: configPro.obturador ?? 0,
        DetalheAbertura: configPro.abertura ?? 22,
        DetalheExposicao: configPro.exposicao ?? 0
    };

    for (const [Texto, valor] of Object.entries(camposTextoPro)) {
        const elemento = document.getElementById(Texto);
        elemento.textContent = valor;
    }
} else {
    document.getElementById('DetalhePro').classList.add('hidden');
    document.getElementById('DetalheConfigPro_Bloco').classList.add('hidden');
}

InicializarComentarios();
ExibirComentarios();

}

configSeta.addEventListener('click', () => {
    if (ConfigSelecionada === 'N_Selecionado') {
        configOpcoes.classList.remove('max-h-0','opacity-0');
        configOpcoes.classList.add('max-h-100','opacity-100');
        configImagem.src = '../img/Icon_ArrowUp.png'
        ConfigSelecionada = 'Selecionada';
    } else {
        configOpcoes.classList.remove('max-h-100','opacity-100');
        configOpcoes.classList.add('max-h-0','opacity-0');
        configImagem.src = '../img/Icon_ArrowDown.png'
        ConfigSelecionada = 'N_Selecionado';
    }
})

configProSeta.addEventListener('click', () => {
    if (ConfigProSelecionada === 'N_Selecionado') {
        configProOpcoes.classList.remove('max-h-0','opacity-0');
        configProOpcoes.classList.add('max-h-100','opacity-100');
        configProImagem.src = '../img/Icon_ArrowUp.png';
        ConfigProSelecionada = 'Selecionada';
    } else {
        configProOpcoes.classList.remove('max-h-100','opacity-100');
        configProOpcoes.classList.add('max-h-0','opacity-0');
        configProImagem.src = '../img/Icon_ArrowDown.png';
        ConfigProSelecionada = 'N_Selecionado';
    }
})

ExibirModos();
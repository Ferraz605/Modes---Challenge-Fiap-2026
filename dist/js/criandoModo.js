import {InicializarCategoria,obterCategoriasSalvas,CriandoModo,CriandoModoPro,InicializarModos,InicializarModosPro} from './dados.js'

// DESCRITIVO
const nomeModo = document.getElementById('nomeModo');
const descricaoModoText = document.getElementById('DescricaoModoText');

// CATEGORIAS
const listaCategorias = document.getElementById('listaCategorias');
const ImagemPost = document.getElementById('Imagem_Post');
const divPost = document.getElementById('Div_Post');

// IMAGEM PREVIEW
const botaoFundo = document.getElementById('BotaoAdicionarPreview');
const adicionarFundo = document.getElementById('Adicionar_Preview');
const fecharPreview = document.getElementById('Fechar_Preview');

// FILTROS NORMAIS
const brilho = document.getElementById('brilho');
const contraste = document.getElementById('contraste');
const temperatura = document.getElementById('temperatura');
const saturacao = document.getElementById('saturacao');

const bilhoText = document.getElementById('valor_brilho');
const contrasteText = document.getElementById('valor_contraste');
const temperaturaText = document.getElementById('valor_temperatura');
const SaturacaoText = document.getElementById('valor_saturacao');

let valoresFiltro = {
    brilho: 0,
    contraste: 0,
    saturacao: 0,
};

let valorTemperatura = 0;

// FILTROS PRO
const estadoPro = document.getElementById('Estado_pro');

const iso = document.getElementById('iso');
const obturador = document.getElementById('obturador');
const abertura = document.getElementById('abertura');
const exposicao = document.getElementById('exposicao');

const isoText = document.getElementById('valor_iso');
const obturadorText = document.getElementById('valor_obturador');
const aberturaText = document.getElementById('valor_abertura');
const exposicaoText = document.getElementById('valor_exposicao');

const imagemPreview = document.getElementById('ImagemPreview');

const blurObturadorSVG = document.getElementById('blurObturador');

let valorExposicao = 0;
let valorAbertura = 22;
let valorISO = 0;
let valorObturador = 0;

// CONFIGURAÇÔES
const configSeta = document.getElementById('Config_Seta');
const configProSeta = document.getElementById('ConfigPro_Seta');

const configOpcoes = document.getElementById('Config_Opcoes');
const configProOpcoes = document.getElementById('ConfigPro_Opcoes');

const configImagem = document.getElementById('Config_Imagem');
const configProImagem = document.getElementById('ConfigPro_Imagem');

let ConfigSelecionada = 'Selecionada';
let ConfigProSelecionada = 'N_Selecionado';

// PUBLICAR
const ButtonPublicarUm = document.getElementById('Button_PublicarUm');
const ButtonPublicarDois = document.getElementById('Button_PublicarDois');

let idCategoria = null;
let previewImagem = '../img/Imagem_Camera.jpg';

const addCategoriaText = document.getElementById('AdicionarCategoriaText');

const usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado'));
const nomeUsuario = usuarioAtual?.nome ?? 'UU';
const idUsuario = usuarioAtual?.ud ?? Date.now();

// FUNÇÔES
function InicializarStorage() {
    InicializarCategoria();
    ExibirCategorias();
    InicializarModos();
    InicializarModosPro();
}

InicializarStorage()

function ExibirCategorias() {
    const objCategoria = obterCategoriasSalvas();

    objCategoria.forEach(categoria => {
        if(categoria.id != 1){
            const item = document.createElement('li');
            item.textContent = categoria.nome;
            item.className = 'bg-[#55586C] rounded-lg pl-2 pr-2 mt-4 cursor-pointer text-[18px]';
            item.dataset.categoriaId = categoria.id;
            listaCategorias.appendChild(item);

            item.addEventListener('click', () => {
                listaCategorias.querySelectorAll('li').forEach(li => {
                    li.classList.remove('bg-[#0051FF]');
                    li.classList.add('bg-[#55586C]');
                });

                item.classList.remove('bg-[#55586C]');
                item.classList.add('bg-[#0051FF]');

                divPost.className = `${categoria.corFundo} m-5 h-45 flex items-center justify-center`;
                ImagemPost.src = categoria.icone;

                idCategoria = categoria.id;
            });            
        }

    });
}

function ConverterParaFiltro() {
    let resultado = {};

    for (const [chave, valor] of Object.entries(valoresFiltro)) {
        const valorConvertido = (valor / 100) + 1;
        resultado[chave] = valorConvertido;
    }

    return resultado;
}

function ConverterTemperatura(valorTemperatura) {
    if (valorTemperatura >= 0) {
        const sepiaValor = valorTemperatura / 100;
        return `sepia(${sepiaValor})`;
    } else {
        const hueValor = Math.abs(valorTemperatura) * 2;
        return `hue-rotate(${hueValor}deg)`;
    }
}

function ConverterAbertura(valorAbertura) {
    const blurInvertido = (22 - valorAbertura) / 4; 
    return blurInvertido;
}

function ResetarFiltroPro () {
    valorExposicao = 0;
    exposicao.value = 0;
    exposicaoText.textContent = exposicao.value

    valorAbertura = 22; 
    abertura.value = 22;
    aberturaText.textContent = abertura.value

    valorISO = 0;
    iso.value = 0
    isoText.textContent = iso.value

    valorObturador = 0;
    obturador.value = 0;
    obturadorText.textContent = obturador.value

    blurObturadorSVG.setAttribute('stdDeviation', '0 0');

    imagemPreview.style.filter = AplicarFiltro();   
}

function AplicarFiltro() {
    let valorConvertido = ConverterParaFiltro();
    const brilhoTotal = valorConvertido.brilho + (valorExposicao / 100);
    let filtro = `brightness(${brilhoTotal}) contrast(${valorConvertido.contraste}) ${ConverterTemperatura(valorTemperatura)} saturate(${valorConvertido.saturacao}) blur(${ConverterAbertura(valorAbertura)}px)
    url(#filtroObturador) url(#filtroISO)`;
    return filtro;
    
}

function MarcarErro (nomeCampo) {
    nomeCampo.focus();
    nomeCampo.classList.remove('animate-shake');
    void nomeCampo.offsetWidth; 
    nomeCampo.classList.add('animate-shake');
}

function Publicar () {
    if(nomeModo.value === ''){
        MarcarErro(nomeModo);
    } else if (idCategoria === null) {
        MarcarErro(addCategoriaText)
    } else if (valoresFiltro.brilho === 0 && valoresFiltro.contraste === 0 && valoresFiltro.saturacao === 0 && valorTemperatura === 0) {
        MarcarErro(configSeta)
    } else if (estadoPro.textContent === 'Ativado' && valorISO === 0 &&  valorObturador === 0 && valorExposicao === 0 && valorAbertura === 22) {
        MarcarErro(configProSeta)
    } else{
        const idModoNovo = Date.now();
    
        CriandoModo(idModoNovo, idCategoria, idUsuario, nomeUsuario, nomeModo.value, descricao_modo.value, valoresFiltro.brilho, valoresFiltro.contraste, valorTemperatura, valoresFiltro.saturacao, previewImagem);

        if (estadoPro.textContent === 'Ativado') {
            CriandoModoPro(idModoNovo, valorISO, valorObturador, valorAbertura, valorExposicao);
        }

        nomeModo.textContent = '';
        descricaoModoText.textContent = '';
        window.location.href = 'Explorador.html'; 
    }
}

// LISTENERS

botaoFundo.addEventListener('click', () =>{
    adicionarFundo.click();
})

adicionarFundo.addEventListener('change', () => {
    const arquivo = adicionarFundo.files[0];

    const leitor = new FileReader();
    
    leitor.onload = () => {
        const imagemTemp = new Image();
        imagemTemp.onload = () => {
            const larguraMaxima = 800;
            let novaLargura = imagemTemp.width;
            let novaAltura = imagemTemp.height;

            if (novaLargura > larguraMaxima) {
                novaAltura = (larguraMaxima / novaLargura) * novaAltura;
                novaLargura = larguraMaxima;
            }

            const canvas = document.createElement('canvas');
            canvas.width = novaLargura;
            canvas.height = novaAltura;

            const contexto = canvas.getContext('2d');
            contexto.drawImage(imagemTemp, 0, 0, novaLargura, novaAltura);

            const imagemRedimensionada = canvas.toDataURL('image/jpeg', 0.8);

            imagemPreview.src = imagemRedimensionada;
            botaoFundo.className = 'bg-[#0051FF]/90 pl-2 pr-2 rounded-[10px] text-[20px] mb-5 text-white cursor-pointer';
            fecharPreview.classList.remove('hidden');
            previewImagem = imagemRedimensionada;
        };
        imagemTemp.src = leitor.result;
    }

    leitor.readAsDataURL(arquivo);
})

fecharPreview.addEventListener('click', () => {
    botaoFundo.className = 'bg-[#55586C]/90 pl-2 pr-2 rounded-[10px] text-[20px] mb-5 text-white cursor-pointer';
    imagemPreview.src = '../img/Imagem_Camera.jpg'
    fecharPreview.classList.add('hidden')
    previewImagem ='../img/Imagem_Camera.jpg';
})

configSeta.addEventListener('click', () => {
    if (ConfigSelecionada === 'N_Selecionado') {
        configOpcoes.classList.remove('max-h-0','opacity-0');
        configOpcoes.classList.add('max-h-100','opacity-100');
        configImagem.src = '../img/Icon_ArrowDown.png'
        ConfigSelecionada = 'Selecionada';
    } else {
        configOpcoes.classList.remove('max-h-100','opacity-100');
        configOpcoes.classList.add('max-h-0','opacity-0');
        configImagem.src = '../img/Icon_ArrowUp.png'
        ConfigSelecionada = 'N_Selecionado';
    }
})

configProSeta.addEventListener('click', () => {
    if (ConfigProSelecionada === 'N_Selecionado') {
        configProOpcoes.classList.remove('max-h-0','opacity-0');
        configProOpcoes.classList.add('max-h-100','opacity-100');
        estadoPro.textContent = 'Ativado';
        estadoPro.className = 'bg-[#0051FF] text-white text-sm rounded-md px-2 py-1 ml-1 mt-3';
        configProImagem.src = '../img/Icon_ArrowDown.png';
        ConfigProSelecionada = 'Selecionada';

    } else {
        configProOpcoes.classList.remove('max-h-100','opacity-100');
        configProOpcoes.classList.add('max-h-0','opacity-0');
        estadoPro.textContent = 'Desativado';
        estadoPro.className = 'bg-[#55586C] text-white text-sm rounded-md px-2 py-1 ml-1 mt-3';
        configProImagem.src = '../img/Icon_ArrowUp.png';
        ConfigProSelecionada = 'N_Selecionado';
        ResetarFiltroPro() 
    }
})

brilho.addEventListener('input', () => {
    valoresFiltro.brilho = brilho.value;
    bilhoText.textContent = brilho.value;
    imagemPreview.style.filter = AplicarFiltro();
})

contraste.addEventListener('input', () => {
    valoresFiltro.contraste = contraste.value;
    contrasteText.textContent = contraste.value;
    imagemPreview.style.filter = AplicarFiltro();
})

temperatura.addEventListener('input', () => {
    valorTemperatura = temperatura.value;
    temperaturaText.textContent = temperatura.value;
    imagemPreview.style.filter = AplicarFiltro();
})

saturacao.addEventListener('input', () => {
    valoresFiltro.saturacao = saturacao.value;
    SaturacaoText.textContent = saturacao.value;
    imagemPreview.style.filter = AplicarFiltro();
})

exposicao.addEventListener('input', () => {
    if(estadoPro.textContent.trim() === 'Ativado'){
        valorExposicao = exposicao.value;
        exposicaoText.textContent = exposicao.value;
        imagemPreview.style.filter = AplicarFiltro();        
    }
})

abertura.addEventListener('input', () => {
    if(estadoPro.textContent.trim() === 'Ativado'){
        valorAbertura = abertura.value;
        aberturaText.textContent = abertura.value;
        imagemPreview.style.filter = AplicarFiltro();        
    }

})
obturador.addEventListener('input', () => {
    if(estadoPro.textContent.trim() === 'Ativado'){
        valorObturador = obturador.value;
        obturadorText.textContent = obturador.value;
        
        blurObturadorSVG.setAttribute('stdDeviation', `${valorObturador / 20} 0`); 
        imagemPreview.style.filter = AplicarFiltro();        
    }
})

iso.addEventListener('input', () => {
    if(estadoPro.textContent.trim() === 'Ativado'){
        valorISO = iso.value;
        isoText.textContent = iso.value;

        const turbulencia = document.getElementById('turbulenciaISO');
        const opacidadeRuido = document.getElementById('opacidadeISO');
        
        const proporcaoISO = valorISO / 6400; 

        const frequencia = 0.9 - (proporcaoISO * 0.7);
        turbulencia.setAttribute('baseFrequency', frequencia);

        const intensidade = proporcaoISO * 0.5;
        opacidadeRuido.setAttribute('values', 
            `0 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 ${intensidade} 0`
        );

        imagemPreview.style.filter = AplicarFiltro();        
    }
})

ButtonPublicarUm.addEventListener('click', Publicar);
ButtonPublicarDois.addEventListener('click', Publicar);
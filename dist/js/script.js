import {InicializarDownloadModos,obterDownloadsSalvos,InicializarUsuario,obterModosSalvos,obterModosProSalvos} from './dados.js';
import {AplicarFiltro,AplicarFiltroObturador,AplicarFiltroISO,CapturarComFiltro} from './filtros.js';

const sectionLista = document.getElementById('sectionLista');
const ButtonModes = document.getElementById('ButtonModes');
const modalOpcoes = document.getElementById('modal_Opcoes');
const AbrirModal = document.querySelectorAll('.abrir_Modal')
const ModalSair = document.getElementById('Modal_Sair');
const modalOpcoesConteudo = document.getElementById('modalOpcoesConteudo');

const fotosGaleria = document.getElementById('fotos_Galeria');
const modalGaleriaConteudo = document.getElementById('ModalGaleriaConteudo');
const abrirGaleria = document.getElementById('AbrirGaleria'); 
const sairGaleria = document.getElementById('Sair_Galeria');

const buttonCapturar = document.getElementById('Button_Capturar');
const cameraAtual = document.getElementById('Camera_Atual');
let modoAtivoId = null;

const ImagemGaleria = document.getElementById('Imagem_Galeria');

const blurObturadorSVG = document.getElementById('blurObturador');
const turbulenciaISOSVG = document.getElementById('turbulenciaISO');
const opacidadeISOSVG = document.getElementById('opacidadeISO');

let tipoSelecionado = 'N_Selecionado';

// INICIALIZAÇÔES
InicializarDownloadModos();
InicializarUsuario();

function ListarModos () {
    const usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado')) ?? 0;

    const modosBaixados = obterDownloadsSalvos();
    const modos = obterModosSalvos();
    const pro = obterModosProSalvos();
    const ListaConteudo = document.getElementById('Lista_Filtros_Conteudo');
    ListaConteudo.innerHTML = '';

    const modosFiltrado = modosBaixados.filter(m => m.idUsuario === usuarioAtual.id);

    if (modosFiltrado.length === 0) {
        const item = document.createElement('li');
        item.textContent = 'Sem Modos...';
        item.className = 'text-2xl text-white opacity-60';
        ListaConteudo.appendChild(item);
    } else {
        modosFiltrado.forEach((modo) => {
            const modoCompleto = modos.find(m => m.id_modo === modo.idModo);
            const ModoPro = pro.find(p => p.id_modo === modo.idModo);

            const item = document.createElement('li');
            item.textContent = modoCompleto.nome;
            item.className = 'text-lg text-white/70 cursor-pointer whitespace-nowrap shrink-0';
            item.dataset.modoId = modoCompleto.id_modo;

            item.addEventListener('click', () => {
            ListaConteudo.querySelectorAll('li').forEach(li => {
                li.classList.add('text-white/70');
                li.classList.remove('text-white');
            });            

            if(modoAtivoId === modo.id_modo) {
                 cameraAtual.style.filter = '';
                 modoAtivoId = null;
            } else {
                item.classList.remove('text-white/70');
                item.classList.add('text-white');

                cameraAtual.style.filter = AplicarFiltro(modoCompleto.brilho,modoCompleto.contraste,modoCompleto.temperatura,modoCompleto.saturacao, ModoPro?.exposicao ?? 0, ModoPro?.abertura ?? 22);
                AplicarFiltroObturador(blurObturadorSVG, 0);
                AplicarFiltroISO(turbulenciaISOSVG, opacidadeISOSVG, 0);

                if (ModoPro) {
                    AplicarFiltroObturador(blurObturadorSVG, ModoPro.obturador);
                    AplicarFiltroISO(turbulenciaISOSVG, opacidadeISOSVG, ModoPro.iso);
                } else {
                    AplicarFiltroObturador(blurObturadorSVG, 0);
                    AplicarFiltroISO(turbulenciaISOSVG, opacidadeISOSVG, 0);
                }                
                modoAtivoId = modo.id_modo;
            }
            })

            ListaConteudo.appendChild(item);
        });
    }
}


ListarModos();

ButtonModes.addEventListener('click', () => {
    if (tipoSelecionado === 'N_Selecionado') {
        sectionLista.classList.remove('max-h-0', 'opacity-0');
        sectionLista.classList.add('max-h-20', 'opacity-100');
        tipoSelecionado = 'Selecionado';
    } else {
        sectionLista.classList.remove('max-h-20', 'opacity-100');
        sectionLista.classList.add('max-h-0', 'opacity-0');
        tipoSelecionado = 'N_Selecionado';
    }
})

ModalSair.addEventListener('click', () => {
        modalOpcoesConteudo.classList.remove('scale-100', 'opacity-100');
        modalOpcoesConteudo.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modalOpcoes.classList.remove('flex');
            modalOpcoes.classList.add('hidden');
    }, 300);

})

AbrirModal.forEach((Modal) => {
    Modal.addEventListener('click', () => {
        modalOpcoes.classList.remove('hidden');
        modalOpcoes.classList.add('flex');

        setTimeout(() => {
            modalOpcoesConteudo.classList.remove('scale-95', 'opacity-0');
            modalOpcoesConteudo.classList.add('scale-100', 'opacity-100');
    }, 10);
    })
})

abrirGaleria.addEventListener('click', () => {
    fotosGaleria.classList.remove('hidden');
    fotosGaleria.classList.add('flex');

    setTimeout(() => {
        modalGaleriaConteudo.classList.remove('scale-95', 'opacity-0');
        modalGaleriaConteudo.classList.add('scale-100', 'opacity-100');
    }, 10);
});

sairGaleria.addEventListener('click', () => {
    modalGaleriaConteudo.classList.remove('scale-100', 'opacity-100');
    modalGaleriaConteudo.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        fotosGaleria.classList.remove('flex');
        fotosGaleria.classList.add('hidden');
    }, 300);
});



buttonCapturar.addEventListener('click', () => {
    buttonCapturar.classList.add('bg-white');
    cameraAtual.classList.remove('opacity-90');
    cameraAtual.classList.add('opacity-50');

    setTimeout(() => {
        buttonCapturar.classList.remove('bg-white');
        cameraAtual.classList.remove('opacity-50');
        cameraAtual.classList.add('opacity-90');

        const fotoCongelada = CapturarComFiltro(cameraAtual, cameraAtual.style.filter);

        ImagemGaleria.src = fotoCongelada;
        ImagemGaleria.style.filter = '';

        abrirGaleria.src = fotoCongelada;
        abrirGaleria.style.filter = '';
    }, 200);
    
})
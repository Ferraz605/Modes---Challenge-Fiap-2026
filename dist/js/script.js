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

const ListaFiltroConteudo = document.getElementById('Lista_Filtros_Conteudo');

const CameraAtual = document.getElementById('Camera_Atual');

let tipoSelecionado = 'N_Selecionado';
let tipoGaleria = 'Desligado';


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
    CameraAtual.classList.remove('opacity-90');
    CameraAtual.classList.add('opacity-50');

        setTimeout(() => {
            buttonCapturar.classList.remove('bg-white');
            CameraAtual.classList.remove('opacity-50');
            CameraAtual.classList.add('opacity-90');
    }, 200);
})
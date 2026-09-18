import {InicializarCategoria,obterCategoriasSalvas,obterModosSalvos,obterModosProSalvos,InicializarModos,InicializarCurtidas,obterCurtidasSalvas,AdicionandoCurtida,
InicializarDownloadModos,AdicionandoDownload,obterDownloadsSalvos} from './dados.js';

// HEADER
const headerModes = document.getElementById('headerModes');
const logoModes = document.getElementById('logoModes');
const lupaPesquisar = document.getElementById('LupaPesquisar');
const pesquisarModoInput = document.getElementById('PesquisaModosInput');   
const nadaEncontrado = document.getElementById('nadaEncontrado');
let tipoLupa = 'N_selecionado';

// LISTA DE MODOS
const listaDestaque = document.getElementById('listaDestaques'); 
const sectionDestaques = document.getElementById('sectionDestaques');
const descubraText = document.getElementById('DescubraText');

// CATEGORIAS
const listaCategorias = document.getElementById('listaCategorias');

const usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado')) ?? 0;

// FILTRO DE MODOS
let idCategoriaFiltro = 0;


// INICIALIZAÇÔES
InicializarCategoria();
InicializarCurtidas();
InicializarDownloadModos();
InicializarModos();

ExibirCategoriasExplorador();
ExibirModos();
ExibirModosDestaque();


// FUNÇÔES
function ExibirCategoriasExplorador() {
    const objCategoria = obterCategoriasSalvas();

    objCategoria.forEach(categoria => {
        const item = document.createElement('li');
        item.textContent = categoria.nome;
        item.dataset.categoriaId = categoria.id;

        if (categoria.id === 1) {
            item.className = 'bg-[#0051FF] rounded-lg pl-2 pr-2 cursor-pointer text-[20px]';
        } else {
            item.className = 'bg-[#55586C] rounded-lg pl-2 pr-2 cursor-pointer text-[20px]';
        }

        listaCategorias.appendChild(item);

        item.addEventListener('click', () => {
            listaCategorias.querySelectorAll('li').forEach(li => {
                li.classList.remove('bg-[#0051FF]');
                li.classList.add('bg-[#55586C]');
            });

            item.classList.remove('bg-[#55586C]');
            item.classList.add('bg-[#0051FF]');

            idCategoriaFiltro = categoria.id;

            AplicarFiltros();
        });
    });
}

function AplicarFiltros() {
    let modosFiltrados = obterModosSalvos();

    if (idCategoriaFiltro != 1) {
        modosFiltrados = modosFiltrados.filter(m => m.id_categoria === idCategoriaFiltro);
    }

    modosFiltrados = modosFiltrados.filter(modo => 
        modo.nome.toLowerCase().includes(pesquisarModoInput.value.toLowerCase())
    );

    sectionDestaques.classList.toggle('hidden', idCategoriaFiltro != 1 || pesquisarModoInput.value !== '');

    ExibirModos(modosFiltrados);
}

function ExibirModosDestaque () {
    const modos = obterModosSalvos();
    const categorias = obterCategoriasSalvas();
    const modosPro = obterModosProSalvos();
    const downloadModo = obterDownloadsSalvos();

    const ordenadas = modos.sort((a,b) => b.curtidas - a.curtidas)
    const recentes = ordenadas.slice(0,4);
    const curtidas = obterCurtidasSalvas();

    listaDestaque.innerHTML = '';

    recentes.forEach(modo => { 
        const categoria = categorias.find(c => c.id === modo.id_categoria);
        const configPro = modosPro.find(mp => mp.id_modo === modo.id_modo);

        const downloadsFiltrados = downloadModo.filter(d => d.idModo === modo.id_modo)
        const curtidasFiltradas = curtidas.filter(c => c.idModo === modo.id_modo);

        const usuarioJaCurtiu = curtidasFiltradas.some(c => c.idUsuario === usuarioAtual.id);
        const usuarioJaBaixou = downloadsFiltrados.some(d => d.idUsuario === usuarioAtual.id);

        const card = document.createElement('div');
        card.className = `h-55 rounded-sm overflow-hidden relative border border-white/20 shadow-[10px_2px_4px_-3px_rgba(0,0,0,0.5)] ${categoria.corFundo}`;

        card.innerHTML = `
            <div class="absolute top-0 left-0 right-0 bottom-27 flex items-center justify-center">
                <img src="${categoria.icone}" alt="Icone ${categoria.nome}" class="w-25">
            </div>

            <div class="absolute bottom-0 left-0 w-full h-27 bg-black/60 p-3">
                <div class="flex flex-row justify-between items-start">
                    <h2 class="text-white text-lg">${modo.nome}</h2>
                    <span class="bg-[#55586C] text-white text-xs rounded-md px-2 py-1">${categoria.nome}</span>
                </div>

                <div class="flex flex-row gap-1 justify-between items-end">
                    <span class="text-white/70 text-sm">Por @${modo.nome_usuario}</span>
                    ${configPro ? '<span class="bg-[#55586C] text-white text-xs rounded-md px-2 py-1">Pro</span>' : '<span class="bg-[#55586C] text-white text-xs rounded-md opacity-0 px-2 py-1">Normal</span>'}
                </div>

                <div class="flex flex-row justify-between items-center mt-2">
                    <div class="flex flex-row items-center gap-2  ">
                        <img src="${usuarioJaCurtiu ? '../img/Icon_CoracaoCheio.png' : '../img/Icon_Coracao.png'}" alt="Curtidas" class="w-5 coracaoS cursor-pointer">
                        <span class="text-white text-lg">${modo.curtidas + curtidasFiltradas.length}</span>
                    </div>
                    <img src="${usuarioJaBaixou ? '../img/Sair_Icon.png' : '../img/Icon_Download.png'}" alt="Baixar" class="w-5 cursor-pointer downloadS">
                </div>
            </div>
        `;

       const coracaoS = card.querySelector('.coracaoS')
       const downloadS = card.querySelector('.downloadS')

        listaDestaque.appendChild(card);
        
        coracaoS.addEventListener('click', (evento) => {
            evento.stopPropagation();
            AlternarCuritdas(modo.id_modo);
            ExibirModosDestaque();
        })

        downloadS.addEventListener('click', (evento) => {
            evento.stopPropagation();
            AlternarDownload(modo.id_modo);
            ExibirModosDestaque();
        })

        card.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${modo.id_modo}`;
        });
    });
}

function ExibirModos(modosFiltrados) {
    let modos;

    if (modosFiltrados === undefined) {
        modos = obterModosSalvos();
    } else {
        modos = modosFiltrados;
    }

    const curtidas = obterCurtidasSalvas();
    const downloadModo = obterDownloadsSalvos();
    const categorias = obterCategoriasSalvas();
    const modosPro = obterModosProSalvos();
    const listaModos = document.getElementById('listaModos');
    listaModos.innerHTML = '';
    
    modos.forEach(modo => { 
        const categoria = categorias.find(c => c.id === modo.id_categoria);
        const configPro = modosPro.find(mp => mp.id_modo === modo.id_modo);

        const downloadsFiltrados = downloadModo.filter(d => d.idModo === modo.id_modo)
        const curtidasFiltradas = curtidas.filter(c => c.idModo === modo.id_modo);

        const usuarioJaCurtiu = curtidasFiltradas.some(c => c.idUsuario === usuarioAtual.id);
        const usuarioJaBaixou = downloadsFiltrados.some(d => d.idUsuario === usuarioAtual.id);

        const card = document.createElement('div');
        card.className = `h-55 rounded-sm overflow-hidden relative border border-white/20 shadow-[10px_2px_4px_-3px_rgba(0,0,0,0.5)] ${categoria.corFundo}`;

        card.innerHTML = `
            <div class="absolute top-0 left-0 right-0 bottom-27 flex items-center justify-center">
                <img src="${categoria.icone}" alt="Icone ${categoria.nome}" class="w-25">
            </div>

            <div class="absolute bottom-0 left-0 w-full h-27 bg-black/60 p-3">
                <div class="flex flex-row justify-between items-start">
                    <h2 class="text-white text-lg">${modo.nome}</h2>
                    <span class="bg-[#55586C] text-white text-xs rounded-md px-2 py-1">${categoria.nome}</span>
                </div>

                <div class="flex flex-row gap-1 justify-between items-end">
                    <span class="text-white/70 text-sm">Por @${modo.nome_usuario}</span>
                    ${configPro ? '<span class="bg-[#55586C] text-white text-xs rounded-md px-2 py-1">Pro</span>' : '<span class="bg-[#55586C] text-white text-xs rounded-md opacity-0 px-2 py-1">Normal</span>'}
                </div>


                <div class="flex flex-row justify-between items-center mt-2">
                    <div class="flex flex-row items-center gap-2">
                        <img src="${usuarioJaCurtiu ? '../img/Icon_CoracaoCheio.png' : '../img/Icon_Coracao.png'}" alt="Curtidas" class="w-5 coracaoS cursor-pointer">
                        <span class="text-white text-lg">${modo.curtidas + curtidasFiltradas.length}</span>
                    </div>
                    <img src="${usuarioJaBaixou ? '../img/Sair_Icon.png' : '../img/Icon_Download.png'}" alt="Baixar" class="w-5 cursor-pointer downloadS">
                </div>
            </div>
        `;        
        
        const coracaoS = card.querySelector('.coracaoS')
        const downloadS = card.querySelector('.downloadS')

        listaModos.appendChild(card);

        coracaoS.addEventListener('click', (evento) => {
            evento.stopPropagation();
            AlternarCuritdas(modo.id_modo);
            ExibirModos();
            ExibirModosDestaque();

        })

        downloadS.addEventListener('click', (evento) => {
            evento.stopPropagation();
            AlternarDownload(modo.id_modo);
            ExibirModos();
            ExibirModosDestaque();
        })

            card.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${modo.id_modo}`;
        });
    });
         if(modos.length === 0) {
            nadaEncontrado.classList.remove('hidden');
            nadaEncontrado.classList.add('flex');

            descubraText.classList.add('hidden');
        }   else {
            nadaEncontrado.classList.remove('flex');
            nadaEncontrado.classList.add('hidden');

            descubraText.classList.remove('hidden');
        }
}

function AlternarDownload (idModo) {
    const objDownloadModos = obterDownloadsSalvos();

    const jaBaixou = objDownloadModos.find(d => d.idUsuario === usuarioAtual.id && d.idModo === idModo);

    if(jaBaixou){
        const downloadAtualizado = objDownloadModos.filter(c => !(c.idUsuario === usuarioAtual.id && c.idModo === idModo));
        localStorage.setItem('downloadModos', JSON.stringify(downloadAtualizado));  
        ExibirModos();
    } else {
        AdicionandoDownload(idModo, usuarioAtual.id);
        ExibirModos();
    }    
}

function AlternarCuritdas (idModo) {
    const objCurtida = obterCurtidasSalvas();

    const jaCurtiu = objCurtida.find(c => c.idUsuario === usuarioAtual.id && c.idModo === idModo);

    if(jaCurtiu){
        const curtidasAtualizadas = objCurtida.filter(c => !(c.idUsuario === usuarioAtual.id && c.idModo === idModo));
        localStorage.setItem('curtidas', JSON.stringify(curtidasAtualizadas));  
        ExibirModos();
    } else {
        AdicionandoCurtida(idModo,usuarioAtual.id)
        ExibirModos();
    }
}

// LISTENERS
lupaPesquisar.addEventListener('click', () => {
    if(tipoLupa === 'N_selecionado') {
        pesquisarModoInput.className = 'text-white h-10 text-[18px] border-b border-white outline-none opacity-100 w-50 max-sm:w-full transition-all duration-300';
        logoModes.classList.add('max-sm:hidden');
        headerModes.classList.add('max-sm:justify-center');
        pesquisarModoInput.focus();
        tipoLupa = 'Selecionada';
    } else if (tipoLupa === 'Selecionada'){
        pesquisarModoInput.className = 'text-white h-10 text-[18px] border-b border-white outline-none opacity-0 w-0 transition-all duration-300';
        logoModes.classList.remove('max-sm:hidden')
        headerModes.classList.remove('max-sm:justify-center');

        tipoLupa = 'N_selecionado'        
    }
})

pesquisarModoInput.addEventListener('input', () => {
    AplicarFiltros();
});

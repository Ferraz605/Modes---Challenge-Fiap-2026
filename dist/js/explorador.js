import {InicializarCategoria,obterCategoriasSalvas,obterModosSalvos,obterModosProSalvos,InicializarModos} from './dados.js'

const lupaPesquisar = document.getElementById('LupaPesquisar');
const logoModes = document.getElementById('logoModes');
const headerModes = document.getElementById('headerModes');
const pesquisarModoInput = document.getElementById('PesquisaModosInput');   
const listaDestaque = document.getElementById('listaDestaques'); 
const sectionDestaques = document.getElementById('sectionDestaques');
const descubraText = document.getElementById('DescubraText');
const nadaEncontrado = document.getElementById('nadaEncontrado');

let tipoLupa = 'N_selecionado';

// CATEGORIAS
const listaCategorias = document.getElementById('listaCategorias');

// FILTRO DE MODOS
let idCategoriaFiltro = 0;

// FUNÇÔES
function InicializarStorage() {
    InicializarCategoria();
    InicializarModos();
    ExibirCategoriasExplorador();
    ExibirModos();
    ExibirModosDestaque ();
}

InicializarStorage()

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

    const ordenadas = modos.sort((a,b) => b.curtidas - a.curtidas)
    const recentes = ordenadas.slice(0,4);

    recentes.forEach(modo => { 
        const categoria = categorias.find(c => c.id === modo.id_categoria);
        const configPro = modosPro.find(mp => mp.id_modo === modo.id_modo);

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
                    <div class="flex flex-row items-center gap-2 cursor-pointer">
                        <img src="../img/Icon_Coracao.png" alt="Curtidas" class="w-5">
                        <span class="text-white text-lg">${modo.curtidas}</span>
                    </div>
                    <img src="../img/Icon_Download.png" alt="Baixar" class="w-5 cursor-pointer">
                </div>
            </div>
        `;
        listaDestaque.appendChild(card);

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

    const categorias = obterCategoriasSalvas();
    const modosPro = obterModosProSalvos();
    const listaModos = document.getElementById('listaModos');
    listaModos.innerHTML = '';
    
    modos.forEach(modo => { 
        const categoria = categorias.find(c => c.id === modo.id_categoria);
        const configPro = modosPro.find(mp => mp.id_modo === modo.id_modo);

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
                    <div class="flex flex-row items-center gap-2 cursor-pointer">
                        <img src="../img/Icon_Coracao.png" alt="Curtidas" class="w-5">
                        <span class="text-white text-lg">${modo.curtidas}</span>
                    </div>
                    <img src="../img/Icon_Download.png" alt="Baixar" class="w-5 cursor-pointer">
                </div>
            </div>
        `;        
        
        listaModos.appendChild(card);

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

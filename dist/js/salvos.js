import {obterCategoriasSalvas,obterModosSalvos,obterModosProSalvos,obterSalvos,InicializarSalvos,obterCurtidasSalvas,obterDownloadsSalvos,AdicionandoCurtida,AdicionandoDownload} from './dados.js';

InicializarSalvos();

const containerSalvos = document.getElementById('container-salvos');
const usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado')) ?? 0;

const SalvosText = document.getElementById('SalvosText');

function ExibirModosSalvos() {
    const categorias = obterCategoriasSalvas();
    const modos = obterModosSalvos();
    const modosPro = obterModosProSalvos();
    const salvos = obterSalvos();
    const salvosDoUsuario = salvos.filter(s => s.idUsuario === usuarioAtual.id);

    containerSalvos.innerHTML = '';

    if (salvosDoUsuario.length === 0) {
        SalvosText.className = 'hidden'
        containerSalvos.innerHTML = `
            <div class="flex flex-col gap-8 items-center justify-center mt-50 w-full">
                <img src="../img/Icon_Vazio.png" alt="Icone de nada encontrado" class="opacity-80 w-80">
                <h2 class="text-4xl text-white">Nada encontrado</h2>
                <p class="text-lg text-white">Encontre seus modos favoritos na aba Explorar!</p>
            </div>
        `;
        return;
    }

    categorias.forEach((categoria) => {
        if (categoria.id === 1) return;

        const modosDaCategoria = salvosDoUsuario
            .map(s => modos.find(m => m.id_modo === s.idModo))
            .filter(modo => modo && modo.id_categoria === categoria.id);

        if (modosDaCategoria.length > 0) {
            
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'w-full flex flex-col gap-4 mb-6';

            const headerCategoria = document.createElement('div');
            headerCategoria.className = 'flex flex-row items-center gap-2 cursor-pointer configGeral';
            headerCategoria.innerHTML = `
                <div class="w-2.5 h-2.5 rounded-full ${categoria.corFundo}"></div>
                <h3 class="text-white text-2xl mt-2 mb-2">${categoria.nome}</h3>
                <img src="../img/Icon_ArrowDown.png" alt="Expandir" class="w-10 mt-2 configSeta">
            `;

            const gridCards = document.createElement('div');
            gridCards.className = 'grid grid-cols-2 gap-2 border-b border-white/70 pb-5 ';
            

            const curtidas = obterCurtidasSalvas();
            const downloadModo = obterDownloadsSalvos();

            modosDaCategoria.forEach((modo) => {
                const configPro = modosPro.find(mp => mp.id_modo === modo.id_modo);

                const downloadsFiltrados = downloadModo.filter(d => d.idModo === modo.id_modo)
                const curtidasFiltradas = curtidas.filter(c => c.idModo === modo.id_modo);

                const usuarioJaCurtiu = curtidasFiltradas.some(c => c.idUsuario === usuarioAtual.id);
                const usuarioJaBaixou = downloadsFiltrados.some(d => d.idUsuario === usuarioAtual.id);

                const card = document.createElement('div');
                card.className = `h-55 w-full rounded-sm overflow-hidden relative opacity-100 border transition-all duration-300 border-white/20 shadow-[10px_2px_4px_-3px_rgba(0,0,0,0.5)] ${categoria.corFundo}`;

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

                
                const coracaoS = card.querySelector('.coracaoS');
                const downloadS = card.querySelector('.downloadS');

                const configSeta = headerCategoria.querySelector('.configSeta');

                let tipoSelecionada = 'Selecionada';

                headerCategoria.addEventListener('click', () => {
                    if(tipoSelecionada === 'Selecionada') {
                        configSeta.src = '../img/Icon_ArrowUp.png';
                        card.classList.remove('h-55','opacity-100');
                        card.classList.add('h-0','opacity-0');
                        tipoSelecionada = 'N_Selecionada';
                    } else {
                        configSeta.src = '../img/Icon_ArrowDown.png';    
                        card.classList.remove('h-0','opacity-0');
                        card.classList.add('h-55','opacity-100');
                        tipoSelecionada ='Selecionada';

                    }                    
                })


                card.addEventListener('click', () => {
                    window.location.href = `detalhes.html?id=${modo.id_modo}`;
                });

                
                coracaoS.addEventListener('click', (evento) => {
                    evento.stopPropagation();
                    AlternarCuritdas(modo.id_modo);
                    ExibirModosSalvos()
                })

                downloadS.addEventListener('click', (evento) => {
                    evento.stopPropagation();
                    AlternarDownload(modo.id_modo);
                    ExibirModosSalvos()
                })


                gridCards.appendChild(card);    
            });

            categoriaDiv.appendChild(headerCategoria);
            categoriaDiv.appendChild(gridCards);
            containerSalvos.appendChild(categoriaDiv);

        }
    });
}

function AlternarDownload (idModo) {
    const objDownloadModos = obterDownloadsSalvos();

    const jaBaixou = objDownloadModos.find(d => d.idUsuario === usuarioAtual.id && d.idModo === idModo);

    if(jaBaixou){
        const downloadAtualizado = objDownloadModos.filter(c => !(c.idUsuario === usuarioAtual.id && c.idModo === idModo));
        localStorage.setItem('downloadModos', JSON.stringify(downloadAtualizado));  
        ExibirModosSalvos();
    } else {
        AdicionandoDownload(idModo, usuarioAtual.id);
        ExibirModosSalvos();
    }    
}

function AlternarCuritdas (idModo) {
    const objCurtida = obterCurtidasSalvas();

    const jaCurtiu = objCurtida.find(c => c.idUsuario === usuarioAtual.id && c.idModo === idModo);

    if(jaCurtiu){
        const curtidasAtualizadas = objCurtida.filter(c => !(c.idUsuario === usuarioAtual.id && c.idModo === idModo));
        localStorage.setItem('curtidas', JSON.stringify(curtidasAtualizadas));  
        ExibirModosSalvos();
    } else {
        AdicionandoCurtida(idModo,usuarioAtual.id)
        ExibirModosSalvos();
    }
}

// Executa a função
ExibirModosSalvos();
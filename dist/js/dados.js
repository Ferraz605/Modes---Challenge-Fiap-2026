// ####################################### LOGIN e CADASTRO #######################################

const Usuario = [
    {
        id: Date.now(),
        nome: 'Administrador',
        email: 'dministrador@gmail.com',
        senha: '1234',
        biografia: 'Sou administrador mando em tudo',
        fotoPerfil: ''
    }
];

export function InicializarUsuario() {
     if (localStorage.getItem('Usuario') === null) {
         localStorage.setItem('Usuario', JSON.stringify(Usuario));
        }
}

export function obterUsuariosSalvos() {
    const objUsuario = JSON.parse(localStorage.getItem('Usuario')); 
    return objUsuario;
};

export function CriandoUsuario(nome,email,senha) {
    const objUsuario = JSON.parse(localStorage.getItem('Usuario'));    

    const novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        senha: senha,
        biografia: '',
        fotoPerfil: ''
    }

    objUsuario.push(novoUsuario);
    localStorage.setItem('Usuario', JSON.stringify(objUsuario));
}

// ####################################### CATEGORIAS #######################################

const Categorias = [
    {
        id: 1,
        nome: 'Noturno',
        icone: '../img/Icon_Lua.png',
        corFundo: 'bg-gradient-to-r from-[#0051FF] to-[#013F79] m-5 h-45 flex items-center justify-center'
    },

    {
        id: 2,
        nome: 'Comida',
        icone: '../img/Icon_Comida.png',
        corFundo: 'bg-gradient-to-r from-[#912B00] to-[#FF690C] m-5 h-45 flex items-center justify-center'

    },

    {
        id: 3,
        nome: 'Paisagem',
        icone: '../img/Icon_Montanha.png',
        corFundo: 'bg-gradient-to-r from-[#3FA2FF] to-[#105594] m-5 h-45 flex items-center justify-center'

    },

    {
        id: 4,
        nome: 'Festa',
        icone: '../img/Icon_Festa.png',
        corFundo: 'bg-gradient-to-r from-[#FF0037] to-[#B70080] m-5 h-45 flex items-center justify-center' 

    },

    {
        id: 5,
        nome: 'Selfie',
        icone: '../img/Icon_Selfie.png',
        corFundo: 'bg-gradient-to-r from-[#D4AAFF] to-[#6B2FBF] m-5 h-45 flex items-center justify-center'

    }
];

export function InicializarCategoria() {
    if (localStorage.getItem('Categoria') === null) {
        localStorage.setItem('Categoria', JSON.stringify(Categorias));
    }
}

export function obterCategoriasSalvas() {
    const objCategoria = JSON.parse(localStorage.getItem('Categoria')); 
    return objCategoria;
};

// ####################################### MODOS #######################################

const Modos = [
  {
        id_modo: 1,
        id_categoria: 'Paisagem',
        id_usuario: 1,
        nome_usuario: 'mari.foto',
        nome: 'Golden Hour',
        descricao: 'Tons quentes que simulam o horário do pôr do sol.',
        brilho: 10,
        contraste: 15,
        temperatura: 20,
        nitidez: 5,
        saturacao: 25,
        imagemFundo: null,
        curtidas: 2441
    },
    {
        id_modo: 2,
        id_categoria: 'Festa',
        id_usuario: 2,
        nome_usuario: 'dj_pedro',
        nome: 'Retrô 35mm',
        descricao: 'Efeito vintage inspirado em filmes analógicos.',
        brilho: -5,
        contraste: 20,
        temperatura: 10,
        nitidez: -10,
        saturacao: -15,
        imagemFundo: null,
        curtidas: 1031
    }
];

export function InicializarModos() {
    if (localStorage.getItem('Modos') === null) {
        localStorage.setItem('Modos', JSON.stringify(Modos));
    }
}

export function obterModosSalvos() {
    const objModos = JSON.parse(localStorage.getItem('Modos')); 
    return objModos;
};

export function CriandoModo(idModo,categoria,idUsuario,usuario,nome,descricao,brilho,contraste,temperatura,saturacao,imagemFundo) {
    const objModos = JSON.parse(localStorage.getItem('Modos'));    

    const novoModo = {
        id_modo: idModo,
        id_categoria: categoria,
        id_usuario: idUsuario,
        nome_usuario: usuario,
        nome: nome,
        descricao: descricao,
        brilho: brilho,
        contraste: contraste,
        temperatura: temperatura,
        saturacao: saturacao,
        imagemFundo: imagemFundo,
        curtidas: 0
    }

    objModos.push(novoModo);
    localStorage.setItem('Modos', JSON.stringify(objModos));
}

// ####################################### MODOS PRO #######################################

const modosPro = [];

export function InicializarModosPro() {
    if (localStorage.getItem('modosPro') === null) {
        localStorage.setItem('modosPro', JSON.stringify(modosPro));
    }
}

export function obterModosProSalvos() {
    const objmodosPro = JSON.parse(localStorage.getItem('modosPro')); 
    return objmodosPro;
};

export function CriandoModoPro(idModo, iso, obturador, abertura, exposicao) {
    const objModosPro = JSON.parse(localStorage.getItem('modosPro'));    

    const novoModoPro = {
        id_modo: idModo,
        iso: iso,
        obturador: obturador,
        abertura: abertura,
        exposicao: exposicao
    }

    objModosPro.push(novoModoPro);
    localStorage.setItem('modosPro', JSON.stringify(objModosPro));
}



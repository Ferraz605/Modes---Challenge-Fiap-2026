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
        id: Date.now,
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
        nome: 'Todos'
    },

    {
        id: 2,
        nome: 'Pro'
    },

    {
        id: 3,
        nome: 'Noturno',
        icone: '../img/Icon_Lua.png'
    },

    {
        id: 4,
        nome: 'Comida',
        icone: '../img/Icon_Comida.png'
    },

    {
        id: 5,
        nome: 'Paisagem',
        icone: '../img/Icon_Montanha.png'
    },

    {
        id: 6,
        nome: 'Festa',
        icone: '../img/Icon_Festa.png'
    },

    {
        id: 7,
        nome: 'Selfie',
        icone: '../img/Icon_Selfie.png'
    }
];

export function InicializarCategoria() {
    if (localStorage.getItem('Categoria') === null) {
        localStorage.setItem('Categoria', JSON.stringify(Categorias));
    }
}

// ####################################### MODOS #######################################

const Modos = [
  {
        id_modo: 1,
        id_categoria: 'Paisagem',
        nome: 'Golden Hour',
        descricao: 'Tons quentes que simulam o horário do pôr do sol.',
        brilho: 10,
        contraste: 15,
        temperatura: 20,
        nitidez: 5,
        saturacao: 25,
        imagemFundo: null
    },
    {
        id_modo: 2,
        id_categoria: 'Festa',
        nome: 'Retrô 35mm',
        descricao: 'Efeito vintage inspirado em filmes analógicos.',
        brilho: -5,
        contraste: 20,
        temperatura: 10,
        nitidez: -10,
        saturacao: -15,
        imagemFundo: null
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

export function CriandoModo(categoria, nome,descricao,bilho,constraste,temperatura,nitidez,saturacao,imagemFundo) {
    const objModos = JSON.parse(localStorage.getItem('Modos'));    

    const novoModo = {
        id_modo: Date.now(),
        categoria: categoria,
        nome: nome,
        descricao: descricao,
        brilho: bilho,
        contraste: constraste,
        temperatura: temperatura,
        nitidez: nitidez,
        saturacao: saturacao,
        imagemFundo: imagemFundo
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


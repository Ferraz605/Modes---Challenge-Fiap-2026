// ####################################### LOGIN e CADASTRO #######################################

const Usuario = [
    {
        id: 1,
        nome: 'Administrador',
        email: 'dministrador@gmail.com',
        senha: '1234',
        biografia: 'Sou administrador mando em tudo',
        fotoPerfil: '../img/Icon_UsuarioPadrao.png'
    },
    {
        id: 2,
        nome: 'mari.foto',
        email: 'mariFoto@gmail.com',
        senha: '1234',
        biografia: 'Sou a mari e gosto de fotos de festas',
        fotoPerfil: '../img/Icon_UsuarioPadrao.png'
    },
    {
        id: 3,
        nome: 'leo_m',
        email: 'leoM@gmail.com',
        senha: '1234',
        biografia: 'Sou o leo e gosto de todos os tipos de fotos',
        fotoPerfil: '../img/Icon_UsuarioPadrao.png'
    },
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
        fotoPerfil: '../img/Icon_UsuarioPadrao.png'
    }

    objUsuario.push(novoUsuario);
    localStorage.setItem('Usuario', JSON.stringify(objUsuario));
}

// ####################################### CATEGORIAS #######################################

const Categorias = [
    {
        id:1,
        nome: 'Todos'
    },
    {
        id: 2,
        nome: 'Noturno',
        icone: '../img/Icon_Lua.png',
        corFundo: 'bg-gradient-to-r from-[#0051FF] to-[#013F79]'
    },

    {
        id: 3,
        nome: 'Comida',
        icone: '../img/Icon_Comida.png',
        corFundo: 'bg-gradient-to-r from-[#912B00] to-[#FF690C]'

    },

    {
        id: 4,
        nome: 'Paisagem',
        icone: '../img/Icon_Montanha.png',
        corFundo: 'bg-gradient-to-r from-[#3FA2FF] to-[#105594]'

    },

    {
        id: 5,
        nome: 'Festa',
        icone: '../img/Icon_Festa.png',
        corFundo: 'bg-gradient-to-r from-[#FF0037] to-[#B70080]' 

    },

   // {
     //   id: 5,
       // nome: 'Selfie',
       // icone: '../img/Icon_Selfie.png',
       // corFundo: 'bg-gradient-to-r from-[#D4AAFF] to-[#6B2FBF] m-5 h-45 flex items-center justify-center'
    //}
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
        id_categoria: 4,
        id_usuario: 1,
        nome_usuario: 'mari.foto',
        nome: 'Golden Hour',
        descricao: 'Tons quentes que simulam o horário do pôr do sol.',
        brilho: 10,
        contraste: 15,
        temperatura: 20,
        nitidez: 5,
        saturacao: 25,
        imagemFundo: '../img/Imagem_Camera.jpg',
        curtidas: 898
    },
    {
        id_modo: 2,
        id_categoria: 5,
        id_usuario: 2,
        nome_usuario: 'dj_pedro',
        nome: 'Retrô 35mm',
        descricao: 'Efeito vintage inspirado em filmes analógicos.',
        brilho: -5,
        contraste: 20,
        temperatura: 10,
        nitidez: -10,
        saturacao: -15,
        imagemFundo: '../img/Imagem_Camera.jpg',
        curtidas: 2092
    },
    {
        id_modo: 3,
        id_categoria: 3,
        id_usuario: 3,
        nome_usuario: 'ana_r',
        nome: 'Comida Viva',
        descricao: '',
        brilho: -5,
        contraste: 20,
        temperatura: 10,
        nitidez: -10,
        saturacao: -15,
        imagemFundo: '../img/Imagem_Camera.jpg',
        curtidas: 209

    },
    {
        id_modo: 4,
        id_categoria: 4,
        id_usuario: 4,
        nome_usuario: 'ana_r',
        nome: 'Paisagem Fria',
        descricao: '',
        brilho: -5,
        contraste: 20,
        temperatura: 10,
        nitidez: -10,
        saturacao: -15,
        imagemFundo: '../img/Imagem_Camera.jpg',
        curtidas: 789
    },
    {
        id_modo: 5,
        id_categoria: 5,
        id_usuario: 5,
        nome_usuario: 'joao_lens',
        nome: 'Festa Neon',
        descricao: '',
        brilho: -5,
        contraste: 20,
        temperatura: 10,
        nitidez: -10,
        saturacao: -15,
        imagemFundo: '../img/Imagem_Camera.jpg',
        curtidas: 1827

    },
    {
        id_modo: 6,
        id_categoria: 2,
        id_usuario: 6,
        nome_usuario: 'joao_lens',
        nome: 'Flash Suave',
        descricao: '',
        brilho: -5,
        contraste: 20,
        temperatura: 10,
        nitidez: -10,
        saturacao: -15,
        imagemFundo: '../img/Imagem_Camera.jpg',
        curtidas: 2000
    },
    
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

// ####################################### COMENTARIO #######################################

const comentario = [
    {
        id_comentario: 1,
        id_modo: 1,
        id_usuario: 2,
        ds_comentario: 'Perfeito para a cidade à noite!',
        data: Date.now()
    },
    {
        id_comentario: 2,
        id_modo: 1,
        id_usuario: 3,
        ds_comentario: 'Usei no show ontem, ficou incrível.',
        data: Date.now()
    }
]


export function InicializarComentarios() {
    if (localStorage.getItem('comentarios') === null) {
        localStorage.setItem('comentarios', JSON.stringify(comentario));
    }
}

export function obterComentariosSalvos() {
    const objcomentario = JSON.parse(localStorage.getItem('comentarios')); 
    return objcomentario;
};

export function CriandoComentario(idModo, idUsuario, ds_comentario) {
    const objcomentario = JSON.parse(localStorage.getItem('comentarios'));    

    const novoComentario = {
        id_comentario: Date.now(),
        id_modo: idModo,
        id_usuario: idUsuario,
        ds_comentario: ds_comentario,
        data: Date.now()
    }

    objcomentario.push(novoComentario);
    localStorage.setItem('comentarios', JSON.stringify(objcomentario));
    }


// ####################################### CURTIDAS #######################################

const curtidas = [];

export function InicializarCurtidas() {
    if (localStorage.getItem('curtidas') === null) {
        localStorage.setItem('curtidas', JSON.stringify(curtidas));
    }
}

export function obterCurtidasSalvas() {
    const objcurtidas = JSON.parse(localStorage.getItem('curtidas')); 
    return objcurtidas;
};

export function AdicionandoCurtida(idModo, idUsuario,curtido) {
    const objcurtidas = JSON.parse(localStorage.getItem('curtidas'));    

    const novaCurtida = {
        idCurtida: Date.now(),
        idModo: idModo,
        idUsuario: idUsuario,
    }

    objcurtidas.push(novaCurtida);
    localStorage.setItem('curtidas', JSON.stringify(objcurtidas));
}

// ####################################### DOWNLOAD #######################################
const downloadModos = [];

export function InicializarDownloadModos() {
    if (localStorage.getItem('downloadModos') === null) {
        localStorage.setItem('downloadModos', JSON.stringify(downloadModos));
    }
}

export function obterDownloadsSalvos() {
    const objDownloadModos = JSON.parse(localStorage.getItem('downloadModos')); 
    return objDownloadModos;
};

export function AdicionandoDownload(idModo,idUsuario) {
    const objDownloadModos = JSON.parse(localStorage.getItem('downloadModos'));    

    const novoDownload = {
        idDownloadModo: Date.now(),
        idModo: idModo,
        idUsuario: idUsuario,
    }

    objDownloadModos.push(novoDownload);
    localStorage.setItem('downloadModos', JSON.stringify(objDownloadModos));
}


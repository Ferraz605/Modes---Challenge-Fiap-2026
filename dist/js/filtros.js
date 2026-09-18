export function AplicarFiltro(brilho,contraste,temperatura,saturacao,exposicao,abertura) {
    const brilhoConvertido = (Number(brilho) / 100) + 1;
    const contrasteConvertido = (Number(contraste) / 100) + 1;
    const saturacaoConvertido = (Number(saturacao) / 100) + 1;

    const brilhoTotal = brilhoConvertido + (exposicao / 100);
    let filtro = `brightness(${brilhoTotal}) contrast(${contrasteConvertido}) ${ConverterTemperatura(temperatura)} saturate(${saturacaoConvertido}) blur(${ConverterAbertura(abertura)}px)
    url(#filtroObturador) url(#filtroISO)`;
    return filtro;   
}

export function ConverterTemperatura(valorTemperatura) {
    if (valorTemperatura >= 0) {
        const sepiaValor = valorTemperatura / 100;
        return `sepia(${sepiaValor})`;
    } else {
        const hueValor = Math.abs(valorTemperatura) * 2;
        return `hue-rotate(${hueValor}deg)`;
    }
}

export function ConverterAbertura(valorAbertura) {
    const blurInvertido = (22 - valorAbertura) / 4; 
    return blurInvertido;
}

export function AplicarFiltroObturador(elementoBlur, valorObturador) {
    elementoBlur.setAttribute('stdDeviation', `${valorObturador / 20} 0`);
}

export function AplicarFiltroISO(elementoTurbulencia, elementoOpacidade, valorISO) {
    const proporcaoISO = valorISO / 6400;

    const frequencia = 0.9 - (proporcaoISO * 0.7);
    elementoTurbulencia.setAttribute('baseFrequency', frequencia);

    const intensidade = proporcaoISO * 0.5;
    elementoOpacidade.setAttribute('values',
        `0 0 0 0 0
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 ${intensidade} 0`
    );
}

export function CapturarComFiltro(imagemOrigem, filtroCSS) {
    const larguraMaxima = 800;
    let novaLargura = imagemOrigem.naturalWidth;
    let novaAltura = imagemOrigem.naturalHeight;

    if (novaLargura > larguraMaxima) {
        novaAltura = (larguraMaxima / novaLargura) * novaAltura;
        novaLargura = larguraMaxima;
    }

    const canvas = document.createElement('canvas');
    canvas.width = novaLargura;
    canvas.height = novaAltura;

    const filtroSemSVG = filtroCSS.replace(/url\([^)]*\)/g, '').trim();

    const contexto = canvas.getContext('2d');
    contexto.filter = filtroSemSVG;
    contexto.drawImage(imagemOrigem, 0, 0, novaLargura, novaAltura);

    return canvas.toDataURL('image/png');
}
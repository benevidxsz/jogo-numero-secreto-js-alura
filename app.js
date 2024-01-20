let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//função com parametro sem retorno
function exibirTexto(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMsgInicial(){
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

exibirMsgInicial();

//função sem parametro e sem retorno
function verificarChute()
{
    //input = entrada do usuario
    let chute = document.querySelector('input').value; //esse input so pega o VALOR por causa do .value
    
    if(chute == numeroSecreto)
    {
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else
    {
        if(chute > numeroSecreto)
        {
            exibirTexto('p', 'O número secreto é menor');
        }
        else
        {
            exibirTexto('p', 'O número secreto é maior');
        }
        tentativas++
        limparCampo();
    }
}

//função sem parametro mas com retorno
function gerarNumeroAleatorio()
{
    //return literalmente faz o valor ser retornado na variavel
    let nummeroEscolhido = parseInt(Math.random()* 10 + 1);
    let qtdElementosLista = listaNumerosSorteados.length;

    if (qtdElementosLista == numeroLimite)
    {
        listaNumerosSorteados = [];
    }


    if (listaNumerosSorteados.includes(nummeroEscolhido))//includes = verifica se algum valor esta na lista, se está então é TRUE e fazemos algo, se não está então é FALSE e fazemos outra coisa
        return gerarNumeroAleatorio();
    else
    {
        listaNumerosSorteados.push(nummeroEscolhido) //push adiciona item ao FINAL da lista
        console.log(listaNumerosSorteados);
        return nummeroEscolhido;
    }
        
}

function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)//o true é para estar desabilitado
}
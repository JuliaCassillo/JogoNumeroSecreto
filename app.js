//Essa lista irá iniciar com nenhum valor
let listaDeNumerosSorteados = [];
let numeroLimite =10;
let numeroSecreto = GerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,"Brazilian Portuguese Female",{rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();
//Trecho do código que possui uma responsabilidade
//Determina alguma ação dentro do código
function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        //a Palavra dentro do parenteses precisa ser igual a palavra que foi colocada no HTML
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela("h1", "Você Errou");
            exibirTextoNaTela("p", "O número Secreto é maior");
        } else {
            exibirTextoNaTela("h1", "Você Errou");
            exibirTextoNaTela("p", "O número Secreto é menor");
        }
        tentativas++;
        limparCampo();
    }
}

function GerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista= listaDeNumerosSorteados.length;
    //se eu ja tiver percorrido todas as opções eu quero limpar a minha lista
    if(quantidadeDeElementosNaLista==numeroLimite){
        listaDeNumerosSorteados=[];
    }
    //faz a verificação se na minha lista esse número ja foi escolhido ou não
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return GerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = GerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);

}
let numeros_sorteados = [];
let numeroSecreto = gerarNumero();
let tentativas = 1;
const maxTentativas = 5; // Limite de tentativas

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.5});
}

exibirTexto('h1', 'Jogo do número secreto')
exibirTexto('p', 'Escolha um número entre 1 e 100')
exibirTexto('h2', `Tentativas restantes: ${maxTentativas - tentativas + 1}`); // Mostra as tentativas iniciais

// essa função verifica o chute do usuário e se ele acertar, o botão de Novo jogo vai ser habilitado.
function verificarChute() {
    // declara a variável chute para pegar o valor de entrada e manipular.
    let chute = document.querySelector('input').value;

    // Checa se ainda restam tentativas
    if (tentativas <= maxTentativas) {
        // operador ternário foi utilizado para verificar se o usuário acertou de primeira, 
        // pois se tiver acertado na primeira tentativa, a frase vai aparecer no singular ao invés de aparecer no plural.
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        // Se o jogador acertar o número secreto
        if (chute == numeroSecreto) {
            exibirTexto('h1', 'ACERTOUU!!!🎯');
            exibirTexto('p', msgTentativa);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('chutar').setAttribute('disabled', true); // Desabilita o botão
        } else {
            // Verifica se o chute é maior ou menor que o número secreto
            let msg = chute > numeroSecreto 
                ? `O número secreto é menor que ${chute}` 
                : `O número secreto é maior que ${chute}`;
            exibirTexto('p', msg);

            // Incrementa tentativas
            tentativas++; 
            let tentativasRestantes = maxTentativas - tentativas + 1;

            // Atualiza a tag h2 com as tentativas restantes e verifica se é a última tentativa.
            if (tentativasRestantes === 1) {
                exibirTexto('h2', 'Última tentativa!');
            } else {
                exibirTexto('h2', `Tentativas restantes: ${tentativasRestantes}`);
            }
           

            // Se o limite de tentativas for atingido, fim de jogo
            if (tentativas > maxTentativas) {
                exibirTexto('h1', 'GAME OVER 🤖');
                exibirTexto('p', 'Você excedeu o limite de tentativas!');
                exibirTexto('h2', `O número secreto era ${numeroSecreto}`)
                document.getElementById('reiniciar').removeAttribute('disabled');
                document.getElementById('chutar').setAttribute('disabled', true); // Desabilita o botão
                document.getElementById('resto').style.color = 'green';
            }
        }
    }

    limparCampo(); // Função para limpar o campo input após alguma tentativa do usuário.
}

// Função para gerar um número aleatório até 100
function gerarNumero() {
    let num_maximo = 100;
    let num_escolhido = parseInt(Math.random() * num_maximo + 1);

    // se a quantidade de números gerados chegar no limite, vai esvaziar a lista.
    if (numeros_sorteados.length == num_maximo) {
        numeros_sorteados = [];
    }

    // verifica se o número aleatório já foi gerado antes ou não.
    if (numeros_sorteados.includes(num_escolhido)) {
        return gerarNumero();
    } else {
        numeros_sorteados.push(num_escolhido);
        return num_escolhido;
    }
}

// Função para limpar o campo input depois da tentativa de chute
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function restartGame() {
    location.reload();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}





//O for seria útil se quiséssemos:
//Controlar o número de tentativas de forma explícita: Se o jogo tivesse um limite fixo de tentativas, como 5, poderíamos usar um for para iterar 5 vezes, permitindo que o jogador fizesse 5 chutes.
//Criar um loop que executa um determinado número de vezes: Se quiséssemos realizar uma ação específica um número fixo de vezes, o for seria a ferramenta ideal.
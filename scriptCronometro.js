const tempo = document.getElementById("tempo");
const marca = document.getElementById("listamarcacao");
//abaixo usamos let pois são variáveis que vão mudar de valor
let intervaloID = 0;
let timer = 0; 
let marcacao = [];

// Função que formata o tempo para exibição
/*Essa função é responsável por pegar o valor bruto de tempo (em centésimos de segundo) e convertê-lo em horas, minutos, segundos e centésimos de segundo, para exibição no formato HH:MM:SS:CC.

O parâmetro time é o valor total de tempo, medido em centésimos de segundo. Ou seja:

100 centésimos de segundo = 1 segundo
6000 centésimos de segundo = 1 minuto (100 centésimos/segundo * 60 segundos)
360000 centésimos de segundo = 1 hora (6000 centésimos/minuto * 60 minutos)
Cálculos:

1. Horas (const hours = Math.floor(time / 360000);)
Para calcular quantas horas já passaram, você divide o valor total de time por 360000.
Por que 360000? Porque 1 hora tem 360000 centésimos de segundo:
1 hora = 60 minutos * 60 segundos * 100 centésimos de segundo = 360000 centésimos de segundo.
O Math.floor() é usado para arredondar o valor para baixo. Por exemplo, se tiver 1 hora e meia, ele retorna 1 (apenas as horas inteiras são consideradas).

2. Minutos (const minutes = Math.floor((time % 360000) / 6000);)
Aqui, calculamos quantos minutos passaram, desconsiderando as horas completas. Para isso:
Primeiro, usamos time % 360000 para pegar o resto da divisão por 360000, ou seja, o tempo que sobrou depois de remover as horas completas.
Depois, dividimos esse valor por 6000, já que 1 minuto tem 6000 centésimos de segundo:
1 minuto = 60 segundos * 100 centésimos = 6000 centésimos de segundo.
Novamente, Math.floor() garante que estamos pegando apenas os minutos inteiros.

3. Segundos (const seconds = Math.floor((time % 6000) / 100);)
Para calcular os segundos, usamos o mesmo princípio dos minutos:
time % 6000 dá o resto do tempo, ou seja, o valor de time depois de remover as horas e os minutos completos.
Em seguida, dividimos o resto por 100 para obter os segundos, já que:
1 segundo = 100 centésimos de segundo.

4. Centésimos de segundo (const hundredths = time % 100;)
Aqui, simplesmente usamos time % 100 para obter os centésimos de segundo restantes.
O operador % (módulo) retorna o resto da divisão de time por 100, que nos dá a fração de segundo (centésimos de segundo) que sobrou.

Formatação do Tempo

Finalmente, a função retorna o tempo no formato HH:MM:SS:CC
toString().padStart(2, '0'): Isso transforma o número em uma string e garante que, se for menor que 10, seja precedido por um zero. Por exemplo, 4 se tornará 04.
Assim, sempre temos dois dígitos para cada unidade de tempo, garantindo o formato correto HH:MM:SS:CC.
Resumo:
hours: Obtém o número de horas inteiras no total de tempo.
minutes: Obtém os minutos restantes depois de remover as horas.
seconds: Obtém os segundos restantes depois de remover horas e minutos.
hundredths: Obtém os centésimos de segundo restantes.
Dessa forma, a função formatTime() transforma o tempo bruto em centésimos de segundo em um formato legível de horas, minutos, segundos e centésimos.







*/

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`
}


// Função para adicionar uma marcação de tempo
const markTime = () => {
    marcacao.push(timer)
    addMarkToList(marcacao.length, timer)
}

// Função que exibe a marcação na lista

const addMarkToList = (markIndex, markTime) => {
    marca.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`
}

// Função que alterna entre iniciar e pausar o cronômetro
const toggleTimer = () => {
    const button = document.getElementById('StartPause');
    const action = button.getAttribute('action');

    clearInterval(intervaloID);

    if (action == 'start' || action == 'continue') {
        intervaloID = setInterval(() => {
            timer += 1;
            setTimer(timer)
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<span class="material-icons">pause</span>';
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<span class="material-icons">play_arrow</span>';
    }


}

// Função para resetar o cronômetro
const resetTimer = () => {
    clearInterval(intervaloID);
    timer = 0;
    marcacao = [];
    setTimer(timer);
    marca.innerHTML = '';
    const button = document.getElementById('StartPause');
    button.setAttribute('action', 'start');
    button.innerHTML = '<span class="material-icons">play_arrow</span>';

}


// Função que atualiza o tempo exibido
const setTimer = (timeValue) => {
    tempo.innerText = formatTime(timeValue);
}

// Eventos dos botões
document.getElementById('StartPause').addEventListener('click', toggleTimer);
document.getElementById('marcacao').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);
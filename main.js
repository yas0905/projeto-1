// 1. SELEÇÃO DE ELEMENTOS
const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");
const contadores = document.querySelectorAll(".contador");

// 2. LÓGICA DAS ABAS (Mudar de aba ao clicar)
for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        // Remove a classe "ativo" de todos antes de aplicar no novo
        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }
        // Ativa o botão e o texto correspondente ao índice clicado
        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    };
}

// 3. LÓGICA DO CONTADOR
// Datas de prazo para os 4 objetivos (ajustadas para 2026)
const tempos = [
    new Date("2026-12-31T00:00:00"),
    new Date("2026-08-01T00:00:00"),
    new Date("2026-10-15T00:00:00"),
    new Date("2026-12-01T00:00:00")
];

function calculaTempo(tempoObjetivo) {
    let tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual;

    // Se o prazo já passou
    if (tempoFinal < 0) {
        return "Prazo Encerrado";
    }

    // Cálculos matemáticos
    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    // Ajuste do resto para não ultrapassar 60 (seg/min) ou 24 (horas)
    segundos %= 60;
    minutos %= 60;
    horas %= 24;

    return `${dias} dias ${horas} horas ${minutos} minutos ${segundos} segundos`;
}

// Função que atualiza todos os contadores na tela
function atualizaCronometro() {
    for (let i = 0; i < contadores.length; i++) {
        contadores[i].textContent = calculaTempo(tempos[i]);
    }
}

// Inicia o cronômetro e faz ele atualizar a cada 1 segundo (1000ms)
function iniciar() {
    atualizaCronometro(); // Chama uma vez para não começar vazio
    setInterval(atualizaCronometro, 1000);
}

iniciar();
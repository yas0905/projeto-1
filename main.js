// 1. SELEÇÃO DE ELEMENTOS
const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");
const contadores = document.querySelectorAll(".contador");

// 2. LÓGICA DAS ABAS (Mudar de aba ao clicar)
botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
        // Encontra quem está ativo no momento e remove a classe (mais eficiente do que varrer todos)
        const botaoAtivo = document.querySelector(".botao.ativo");
        const textoAtivo = document.querySelector(".aba-conteudo.ativo");

        if (botaoAtivo) botaoAtivo.classList.remove("ativo");
        if (textoAtivo) textoAtivo.classList.remove("ativo");

        // Adiciona a classe 'ativo' no botão clicado e na aba correspondente
        botao.classList.add("ativo");
        textos[indice].classList.add("ativo");
    });
});

// 3. LÓGICA DO CONTADOR
// Datas de prazo para os 4 objetivos (ajustadas para 2026)
const tempos = [
    new Date("2026-12-31T00:00:00"),
    new Date("2026-08-01T00:00:00"),
    new Date("2026-10-15T00:00:00"),
    new Date("2026-12-01T00:00:00")
];

function calculaTempo(tempoObjetivo) {
    const tempoAtual = new Date();
    const tempoFinal = tempoObjetivo - tempoAtual;

    // Se o prazo já passou
    if (tempoFinal < 0) {
        return "Prazo Encerrado";
    }

    // Cálculos matemáticos simplificados direto na declaração
    const segundos = Math.floor((tempoFinal / 1000) % 60);
    const minutos = Math.floor((tempoFinal / 1000 / 60) % 60);
    const horas = Math.floor((tempoFinal / (1000 * 60 * 60)) % 24);
    const dias = Math.floor(tempoFinal / (1000 * 60 * 60 * 24));

    // Formata os números para sempre terem duas casas (ex: "09" em vez de "9")
    const formataNumero = (numero) => String(numero).padStart(2, '0');

    return `${dias} dias ${formataNumero(horas)} horas ${formataNumero(minutos)} minutos ${formataNumero(segundos)} segundos`;
}

// Função que atualiza todos os contadores na tela
function atualizaCronometro() {
    contadores.forEach((contador, indice) => {
        contador.textContent = calculaTempo(tempos[indice]);
    });
}

// Inicia o cronômetro e faz ele atualizar a cada 1 segundo (1000ms)
function iniciar() {
    atualizaCronometro(); // Chama uma vez para não começar vazio
    setInterval(atualizaCronometro, 1000);
}

iniciar();

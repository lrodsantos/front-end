document.addEventListener("DOMContentLoaded", function () {
    const blocos = document.querySelectorAll(".bloco");
    let jogador_atual = "X";
    let tabuleiro = ["", "", "", "", "", "", "", "", ""];
    let jogador_x_pontuacao = 0;
    let jogador_o_pontuacao = 0;
    const mostrar_jogador_atual = document.getElementById("jogador_atual");
    const mostrar_ganhador = document.getElementById("mostrar_ganhador");
    const btn_de_resetar = document.getElementById("btn-resetar");
    const jogador_x_mostrar_pontuacao = document.getElementById("jogador-x-pontuacao");
    const jogador_o_mostrar_pontuacao = document.getElementById("jogador-o-pontuacao");

    blocos.forEach((bloco, index) => {
        bloco.addEventListener("click", () => {
            if (!bloco.classList.contains("x") && !bloco.classList.contains("o") && mostrar_ganhador.textContent === "") {
                bloco.classList.add(jogador_atual);
                bloco.textContent = jogador_atual;
                tabuleiro[index] = jogador_atual;
                jogador_atual = jogador_atual === "X" ? "O" : "X";
                mostrar_jogador_atual.textContent = `Jogador atual: ${jogador_atual}`;
                checar_ganhador();
            }
        });
    });

    btn_de_resetar.addEventListener("click", () => {
        blocos.forEach((bloco) => {
            bloco.classList.remove("x", "o");
            bloco.textContent = "";
        });

        jogador_atual = "X";
        mostrar_jogador_atual.textContent = `Jogador atual: X`;
        mostrar_ganhador.textContent = "";
        tabuleiro = ["", "", "", "", "", "", "", "", ""];
    });

    function checar_ganhador() {
        const combinacoes_de_vitorias = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combinacoes of combinacoes_de_vitorias) {
            const [a, b, c] = combinacoes;
            if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
                mostrar_ganhador.textContent = `Jogador ${tabuleiro[a]} venceu!`;
                atualizar_pontuacao(tabuleiro[a]);
            }
        }

        if (!tabuleiro.includes("") && mostrar_ganhador.textContent === "") {
            mostrar_ganhador.textContent = "Empate!";
        }
    }

    function atualizar_pontuacao(jogador_vencedor) {
        if (jogador_vencedor === "X") {
            jogador_x_pontuacao++;
            jogador_x_mostrar_pontuacao.textContent = `Jogador X: ${jogador_x_pontuacao}`;
        } else if (jogador_vencedor === "O") {
            jogador_o_pontuacao++;
            jogador_o_mostrar_pontuacao.textContent = `Jogador O: ${jogador_o_pontuacao}`;
        }
    }
});
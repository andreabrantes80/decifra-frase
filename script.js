// Banco de frases por nível
const frases = [
  "ola",
  "este e um teste",
  "copilot ajuda voce a aprender",
  "quanto mais voce joga mais dificil fica",
  "javascript e divertido para criar jogos",
  "a pratica constante melhora suas habilidades de programacao e logica",
  "resolver desafios diariamente aumenta sua capacidade de raciocinio rapido",
  "quanto mais voce se dedica mais resultados positivos aparecem",
  "aprender novas linguagens abre portas para diferentes oportunidades",
  "a programacao estimula a criatividade e o pensamento critico",
  "cada erro cometido e uma chance de evoluir e corrigir",
  "os jogos educativos tornam o aprendizado mais leve e divertido",
  "a persistencia e a chave para superar qualquer dificuldade",
  "explorar novos projetos ajuda a expandir seus conhecimentos",
  "a colaboracao em equipe acelera o processo de aprendizado",
];

let nivel = 0;
let substituicao = {};
let mapaUsuario = {};
let mensagemOriginal = "";
let mensagemCriptografada = "";

// Função para gerar criptografia
function gerarCriptografia() {
  const letras = "abcdefghijklmnopqrstuvwxyz".split("");
  const embaralhadas = [...letras].sort(() => Math.random() - 0.5);
  substituicao = {};
  letras.forEach((c, i) => (substituicao[c] = embaralhadas[i]));
}

// Criptografar mensagem
function criptografarMensagem(mensagem) {
  return mensagem
    .split("")
    .map((c) => {
      if (/[a-z]/.test(c)) {
        return substituicao[c];
      } else {
        return c;
      }
    })
    .join("");
}

// Decifrar mensagem
function decifrarMensagem() {
  return mensagemCriptografada
    .split("")
    .map((c) => {
      if (/[a-z]/.test(c)) {
        return mapaUsuario[c] || "*";
      } else {
        return c;
      }
    })
    .join("");
}

// Iniciar nível
function iniciarNivel() {
  mapaUsuario = {};
  mensagemOriginal = frases[nivel];
  gerarCriptografia();
  mensagemCriptografada = criptografarMensagem(mensagemOriginal);

  document.getElementById("nivel").textContent = nivel + 1;
  document.getElementById("criptografada").textContent = mensagemCriptografada;
  document.getElementById("decifrada").textContent = decifrarMensagem();
  document.getElementById("mensagem").textContent = "";
}

// Jogador tenta decifrar
function tentarDecifrar() {
  const letraCripto = document
    .getElementById("letraCripto")
    .value.toLowerCase();
  const letraOriginal = document
    .getElementById("letraOriginal")
    .value.toLowerCase();

  if (substituicao[letraOriginal] === letraCripto) {
    mapaUsuario[letraCripto] = letraOriginal;
    document.getElementById("mensagem").textContent = "✅ Boa! Você acertou!";
  } else {
    document.getElementById("mensagem").textContent = "❌ Palpite errado!";
  }

  document.getElementById("decifrada").textContent = decifrarMensagem();

  if (!document.getElementById("decifrada").textContent.includes("*")) {
    document.getElementById("mensagem").textContent =
      "🎉 Parabéns! Você decifrou!";
    nivel++;
    if (nivel < frases.length) {
      setTimeout(iniciarNivel, 2000);
    } else {
      document.getElementById("mensagem").textContent =
        "🏆 Você venceu todos os níveis!";
    }
  }
}

// Inicia o jogo
iniciarNivel();
